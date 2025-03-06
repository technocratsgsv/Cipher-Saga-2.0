import type { RequestHandler } from '../$types';
import { adminDB, adminAuth } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {

    if (locals.userID === null || !locals.userExists || locals.userTeam === null) {
        return error(401, 'Unauthorized');
    } else {

        const userDoc = await adminDB.collection('/users').doc(locals.userID).get();
        const teamId = userDoc.data().team;
        const team = await adminDB.collection('/teams').doc(teamId).get();
        const level = team.data().level;
        let isAdmin = false;
        try {
            if (userDoc.exists) {
                const userData = userDoc.data();
                isAdmin = userData?.role === 'admin';
            } else {
                console.error('User not found in database');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        const now = new Date();
        const startTime = new Date("2025-01-03T11:30:00Z");
        const endTime = new Date("2026-01-07T00:00:00Z");
        const questionsVisible = now >= startTime && now <= endTime;
        if (!isAdmin && !questionsVisible) return error(405, "Method Not Allowed");

        await adminDB.runTransaction(async (transaction) => {
            const userRef = adminDB.collection('users').doc(locals.userID!);
            const teamRef = adminDB.collection("teams").doc(locals.userTeam!);
            const nameIndexRef = adminDB.collection('index').doc('nameIndex');
            const userIndexRef = adminDB.collection('index').doc('userIndex');

            const teamData = (await transaction.get(teamRef)).data();
            if (teamData === undefined) return error(404, "Not Found");
            let newMembers = teamData.members.filter((e) => e !== locals.userID);
            if (newMembers.length === 0) {
                await transaction.delete(teamRef);
                let nameIndexData = {
                    teamnames: FieldValue.arrayRemove(teamData.teamName)
                }
                nameIndexData[`teamcodes.${teamData.code}`] = FieldValue.delete();
                nameIndexData[`teamcounts.${teamData.code}`] = FieldValue.delete();
                await transaction.update(nameIndexRef, nameIndexData)
            } else {
                let data = {
                    owner: newMembers[0],
                    members: newMembers,
                    gsv_verified: true,
                };
                for (const id of newMembers) {
                    const userRecord = await adminAuth.getUser(id);
                    if (!userRecord.email?.toString().endsWith("gsv.ac.in")) {
                        data.gsv_verified = false;
                        break;
                    }
                }
                await transaction.update(teamRef, data);
                let nameIndexData = {}
                nameIndexData[`teamcounts.${teamData.code}`] = newMembers
                await transaction.update(nameIndexRef, nameIndexData);
            }
            await transaction.update(userRef, {
                team: null,
            });
            let userIndexData = {};
            userIndexData[locals.userID] = null
            await transaction.update(userIndexRef, userIndexData);
        });
    }



};