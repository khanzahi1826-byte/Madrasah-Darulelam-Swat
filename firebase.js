// آپ کی ویب ایپ کی Firebase کنفیگریشن
const firebaseConfig = {
  apiKey: "AIzaSyBlzq8dkN7CqjjQ1IT8eCgEmKa0QMrHHE4",
  authDomain: "madrasah-management-1e1dd.firebaseapp.com",
  projectId: "madrasah-management-1e1dd",
  storageBucket: "madrasah-management-1e1dd.firebasestorage.app",
  messagingSenderId: "1016553742759",
  appId: "1:1016553742759:web:a0813e7e2f3028485fd682"
};

// Firebase کو شروع کریں
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // اگر پہلے سے شروع ہے تو اسے استعمال کریں
}

// سروسز کے لیے شارٹ کٹ
const auth = firebase.auth();
const db = firebase.firestore();

// ----------------------------------------------------
// Helper Functions for Database Operations
// ----------------------------------------------------

// طلباء کی فہرست حاصل کریں
async function getStudents() {
    const snapshot = await db.collection("students").get();
    const students = [];
    snapshot.forEach(doc => {
        students.push({ id: doc.id, ...doc.data() });
    });
    return students;
}

// اساتذہ کی فہرست حاصل کریں
async function getTeachers() {
    const snapshot = await db.collection("teachers").get();
    const teachers = [];
    snapshot.forEach(doc => {
        teachers.push({ id: doc.id, ...doc.data() });
    });
    return teachers;
}

// کورسز کی فہرست حاصل کریں
async function getCourses() {
    const snapshot = await db.collection("courses").get();
    const courses = [];
    snapshot.forEach(doc => {
        courses.push({ id: doc.id, ...doc.data() });
    });
    return courses;
}
