import type { RequestHandler } from './$types';
import { error, json, redirect } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDB } from '$lib/server/admin';

const questionsCollectionRef = adminDB.collection("/levels");
const questionMap = new Map<string, any>();
let loaded = false;


export const POST: RequestHandler = async ({ request, cookies, locals }) => {
    if (!loaded) {
        const querySnap = await questionsCollectionRef.get();
        querySnap.docs.forEach((q) => {
            questionMap.set(q.id, q.data());
        });
        questionsCollectionRef.onSnapshot((snap) => {
            snap.docs.forEach((q) => {
                questionMap.set(q.id, q.data());
            });
        });
        loaded = true;
    }

    if (locals.userTeam === null || !locals.userExists || locals.userID === null) return redirect(302, "/ready");
    let { questionId, answer } = await request.json();
    console.log(
        `questionId ${questionId} ${typeof questionId}`,
        `answer ${answer} ${typeof answer}`,
    );

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
    if (!questionMap.has(questionId)) return error(404, "Not Found");
    const submittedLevelDoc = await adminDB.collection('/levels').doc(questionId).get();
    const submittedLevel = submittedLevelDoc.data().level;
    if (level < submittedLevel) return error(405, "Method Not Allowed");
    if (answer === null || answer.trim() === "") return error(400, "Bad Request");
    answer = answer.toLowerCase();
    let actualAnswer = questionMap.get(questionId).answer;
    let wasCorrect = false;
    await adminDB.runTransaction(async (transaction) => {
        const teamRef = adminDB.collection("teams").doc(locals.userTeam!);
        const teamDoc = await teamRef.get();
        if (!teamDoc.exists) return error(500, "Something went wrong");
        const teamData = teamDoc.data();
        let completedLevels: Array<string> = teamData['completed_levels'] || [];
        console.log(`completedLevels ${completedLevels} ${typeof completedLevels}`);
        if (completedLevels.includes(questionId)) return json({
            correct: true
        });
        const logRef = adminDB.collection("logs").doc(locals.userTeam!);
        if (answer === actualAnswer) {
            let next_level = teamData.level;
            if (teamData.gsv_verified || !teamData.gsv_verified) next_level++;
            await transaction.update(teamRef, {
                "completed_levels": FieldValue.arrayUnion(questionId),
                "level": next_level,
                "last_change": FieldValue.serverTimestamp()
            });
            await transaction.set(logRef, {
                count: FieldValue.increment(1),
                logs: FieldValue.arrayUnion({
                    "timestamp": new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true
                    }),
                    "questionId": questionId,
                    "type": "correct_answer",
                    "entered": answer,
                    "userId": locals.userID!,
                })
            }, {
                merge: true
            });
            wasCorrect = true;

        } else {
            await transaction.set(logRef, {
                count: FieldValue.increment(1),
                logs: FieldValue.arrayUnion({
                    "timestamp": new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true
                    }),
                    "questionId": questionId,
                    "type": "wrong_answer",
                    "entered": answer,
                    "userId": locals.userID
                })
            }, {
                merge: true
            });
            wasCorrect = false;
        }
    });
    return json({
        "correct": wasCorrect
    })
};
