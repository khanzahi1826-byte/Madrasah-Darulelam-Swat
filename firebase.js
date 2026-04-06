
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

async function getStudentById(id) {
    const doc = await db.collection("students").doc(id).get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    }
    return null;
}

async function addStudent(studentData) {
    const counterRef = db.collection('counters').doc('students');
    const newRollNumber = await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let nextRoll = counterDoc.exists ? counterDoc.data().current + 1 : 1001;
        transaction.set(counterRef, { current: nextRoll });
        return nextRoll;
    });
    const studentId = String(newRollNumber);
    await db.collection("students").doc(studentId).set({ ...studentData, rollNumber: newRollNumber });
    return studentId;
}

async function updateStudent(id, updatedData) {
    const { rollNumber, ...data } = updatedData;
    await db.collection("students").doc(id).update(data);
}

async function deleteStudent(id) {
    await db.collection("students").doc(id).delete();
}

// ----------------------------------------------------
// Teachers - ڈیٹا بیس کے ساتھ کام کرنے کے لیے مددگار فنکشنز
// ----------------------------------------------------

async function getTeachers() {
    const snapshot = await db.collection("teachers").get();
    const teachers = [];
    snapshot.forEach(doc => {
        teachers.push({ id: doc.id, ...doc.data() });
    });
    return teachers;
}

async function getTeacherById(id) {
    const doc = await db.collection("teachers").doc(id).get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    }
    return null;
}

async function addTeacher(teacherData) {
    const counterRef = db.collection('counters').doc('teachers');
    const newTeacherIdNum = await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let nextId = counterDoc.exists ? counterDoc.data().current + 1 : 1;
        transaction.set(counterRef, { current: nextId });
        return nextId;
    });
    const teacherId = String(newTeacherIdNum);
    const { department, ...data } = teacherData; // department is removed
    await db.collection("teachers").doc(teacherId).set({ ...data, teacherId: newTeacherIdNum });
    return teacherId;
}

async function updateTeacher(id, updatedData) {
    const { teacherId, department, ...data } = updatedData; // department is removed
    await db.collection("teachers").doc(id).update(data);
}

async function deleteTeacher(id) {
    await db.collection("teachers").doc(id).delete();
}


// ----------------------------------------------------
// Courses - Course-related helper functions
// ----------------------------------------------------

async function getCourses() {
    const snapshot = await db.collection("courses").orderBy("createdAt", "desc").get();
    const courses = [];
    snapshot.forEach(doc => {
        courses.push({ id: doc.id, ...doc.data() });
    });
    return courses;
}

async function getCourseById(id) {
    const doc = await db.collection("courses").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

async function addCourse(courseData) {
    return await db.collection("courses").add(courseData);
}

async function updateCourse(id, updatedData) {
    return await db.collection("courses").doc(id).update(updatedData);
}

async function deleteCourse(id) {
    return await db.collection("courses").doc(id).delete();
}
