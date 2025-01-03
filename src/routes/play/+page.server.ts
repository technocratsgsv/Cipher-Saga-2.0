import { redirect } from '@sveltejs/kit';
import { adminDB } from '@/server/admin';

const collectionRef = adminDB.collection('/levels').orderBy('level');

let loaded = false;
let questions = [];

export const load = async ({ locals }) => {
  const userDoc = await adminDB.collection('/users').doc(locals.userID).get();
  const teamId = userDoc.data().team;
  const team = await adminDB.collection('/teams').doc(teamId).get();
  const level = team.data().level;

  const now = new Date();
  const startTime = new Date("2025-01-03T11:30:00Z");
  const endTime = new Date("2025-01-06T23:30:00Z");

  const questionsVisible = now >= startTime && now <= endTime;

  if (questionsVisible) {

    if (locals.banned) {
      return redirect(302, '/team');
    }

    if (!loaded) {
      const querySnapshot = await collectionRef.get();
      querySnapshot.docs.forEach((d) => {
        let data = d.data();
        data['answer'] = null;
        questions.push(data);
      });

      collectionRef.onSnapshot((newSnapshot) => {
        const newQuestions = [];
        newSnapshot.docs.forEach((d) => {
          let newData = d.data();
          newData['answer'] = null;
          newQuestions.push(newData);
        });
        questions = newQuestions;
        console.log('new update');
      });
      loaded = true;
    }

    if (
      !locals.userID ||
      !locals.userExists ||
      !locals.userTeam
    ) {
      return redirect(302, '/ready');
    }
  }

  return {
    locals,
    questions : questions.slice(0,level),
  };
};
