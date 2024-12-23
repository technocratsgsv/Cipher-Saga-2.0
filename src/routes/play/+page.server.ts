import { redirect } from '@sveltejs/kit';
import { adminDB } from '@/server/admin'; // Assuming you're using Firebase or a similar DB

// Collection to fetch questions
const collectionRef = adminDB.collection('/levels').orderBy('level');

// Questions and loading flag
let questions = [];
let loaded = false;

// Fetch user role and return data
export const load = async ({ locals }) => {
  // If the user is banned, redirect to /team
  if (locals.banned) {
    return redirect(302, '/team');
  }

  // Fetch questions if not loaded
  if (!loaded) {
    const querySnapshot = await collectionRef.get();
    querySnapshot.docs.forEach((d) => {
      let data = d.data();
      data['answer'] = null;
      questions.push(data);
    });

    // Listen for real-time updates to the questions
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

  // Check if the user is logged in and if they have a valid team
  if (
    !locals.userID ||
    !locals.userExists ||
    !locals.userTeam
  ) {
    return redirect(302, '/ready');
  }

  // Fetch user data to check if they are an admin
  let isAdmin = false;
  try {
    // Assuming you're using a Firestore collection `users` for user data
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

  // Get current time and set start and end times for visibility check
  const now = new Date();
  const startTime = new Date("2024-12-24T00:00:00"); // Start date-time (Midnight)
  const endTime = new Date("2024-12-24T23:59:59"); // End date-time (Just before midnight)

  // Determine if the questions should be visible based on time
  const questionsVisible = now >= startTime && now <= endTime;

  // Return user and questions data along with time-based visibility
  return {
    locals,
    questions,
    isAdmin,
    questionsVisible,
    startTime,
    endTime,
  };
};
