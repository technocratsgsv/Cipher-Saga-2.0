import { redirect } from '@sveltejs/kit';
import { adminDB } from '@/server/admin'; 

const collectionRef = adminDB.collection('/levels').orderBy('level');

let questions = [];
let loaded = false;

export const load = async ({ locals }) => {
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

  let isAdmin = false;
  try {
    const userDoc = await adminDB.collection('users').doc(locals.userID).get();
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
  const startTime = new Date("2025-01-03T17:00:00"); 
  const endTime = new Date("2025-01-07T05:00:00");

  const questionsVisible = now >= startTime && now <= endTime;

  return {
    locals,
    questions,
    isAdmin,
    questionsVisible,
    startTime,
    endTime,
  };
};
