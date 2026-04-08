// Firebase کا بنیادی سیٹ اپ
// Firebase App (لازمی)
import "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
// Firebase سروسز جو آپ استعمال کرنا چاہتے ہیں
import "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js";

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
// Students - ڈیٹا بیس کے ساتھ کام کرنے کے لیے مددگار فنکشنز
// ----------------------------------------------------

async function getStudents() {
    const snapshot = await db.collection("students").get();
    const students = [];
    snapshot.forEach(doc => {
        students.push({ id: doc.id, ...doc.data() });
    });
    return students;
}

// ... (باقی فنکشنز اسی طرح رہیں گے) ...
