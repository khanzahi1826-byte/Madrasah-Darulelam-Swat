// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlzq8dkN7CqjjQ1IT8eCgEmKa0QMrHHE4",
  authDomain: "madrasah-management-1e1dd.firebaseapp.com",
  projectId: "madrasah-management-1e1dd",
  storageBucket: "madrasah-management-1e1dd.firebasestorage.app",
  messagingSenderId: "1016553742759",
  appId: "1:1016553742759:web:a0813e7e2f3028485fd682"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore سروس کو حاصل کریں تاکہ ہم ڈیٹا بیس استعمال کر سکیں
const db = firebase.firestore();

// ----------------------------------------------------
// ڈیٹا بیس کے ساتھ کام کرنے کے لیے مددگار فنکشنز
// ----------------------------------------------------

/**
 * طلباء کے کلیکشن سے تمام دستاویزات حاصل کرتا ہے
 * @returns {Promise<Array>} طلباء کی فہرست پر مشتمل ایک پرو مس
 */
async function getStudents() {
    const snapshot = await db.collection("students").get();
    const students = [];
    snapshot.forEach(doc => {
        students.push({ id: doc.id, ...doc.data() });
    });
    return students;
}

/**
 * ID کی بنیاد پر ایک طالب علم کو حاصل کرتا ہے
 * @param {string} id - طالب علم کی دستاویز کا ID
 * @returns {Promise<Object|null>} طالب علم کا آبجیکٹ یا null
 */
async function getStudentById(id) {
    const doc = await db.collection("students").doc(id).get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    }
    return null;
}

/**
 * ایک نیا طالب علم ڈیٹا بیس میں شامل کرتا ہے
 * @param {Object} studentData - طالب علم کا ڈیٹا آبجیکٹ
 * @returns {Promise<string>} نئے بنائے گئے دستاویز کا ID
 */
async function addStudent(studentData) {
    const docRef = await db.collection("students").add(studentData);
    return docRef.id;
}

/**
 * ایک موجودہ طالب علم کی معلومات کو اپ ڈیٹ کرتا ہے
 * @param {string} id - اپ ڈیٹ کرنے کے لیے طالب علم کا ID
 * @param {Object} updatedData - اپ ڈیٹ شدہ ڈیٹا
 * @returns {Promise<void>}
 */
async function updateStudent(id, updatedData) {
    await db.collection("students").doc(id).update(updatedData);
}

/**
 * ایک طالب علم کو ID کی بنیاد پر حذف کرتا ہے
 * @param {string} id - حذف کرنے کے لیے طالب علم کا ID
 * @returns {Promise<void>}
 */
async function deleteStudent(id) {
    await db.collection("students").doc(id).delete();
}
