import { redirect } from '@sveltejs/kit';
import { adminDB } from '@/server/admin';

const collectionReff = adminDB.collection('/levels').orderBy('level');

let loaded = false;

export const load = async ({ locals }) => {
  let questions = [];
  try {
    const userDoc = await adminDB.collection('/users').doc(locals.userID).get();
    const teamId = userDoc.data().team;
    const team = await adminDB.collection('/teams').doc(teamId).get();
    const level = team.data().level;
    console.log(level);
    var collectionRef;

    let isAdmin = false;
    if (userDoc.exists) {
      const userData = userDoc.data();
      isAdmin = userData?.role === 'admin';
    } else {
      console.error('User not found in database');
    }

    if (!isAdmin) {
      collectionRef = collectionReff.limit(level);
    } else {
      collectionRef = collectionReff;
    }

    const now = new Date();
    const startTime = new Date("2025-01-02T11:30:00Z");
    const endTime = new Date("2025-01-06T23:30:00Z");

    const questionsVisible = now >= startTime && now <= endTime;

    if (isAdmin || questionsVisible) {
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
  } catch (error) {
    console.error('Error in load function:', error);
  }

  return {
    locals,
    questions,
  };
};
