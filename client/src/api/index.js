import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:4000" });

// Teacher Api's
export const updateTeacherPatch = formData => API.patch("/api/v1/teacher", formData);
export const authGet = () => API.get("/api/v1/teacher/auth");
export const logoutGet = () => API.get("/api/v1/teacher/logout");
export const loginPost = (formData, role) => API.post(`/api/v1/${role}/login`, formData);
export const registerPost = formData => API.post("/api/v1/teacher/signup", formData);
export const createCode = formData => API.post("/api/v1/teacher/code", formData);
export const checkCode = formData => API.post("/api/v1/teacher/code/check", formData);

// Class Api's
export const getClasses = role => API.get(`/api/v1/${role}/class`);
export const addClassesPost = formData => API.post("/api/v1/teacher/class", formData);
export const editClassesPatch = (formData, classId) =>
    API.patch(`/api/v1/teacher/class/${classId}`, formData);
export const removeClassesDelete = classId => API.delete(`/api/v1/teacher/class/${classId}`);

// Student Api's
export const getStudentsGet = (classId, role) =>
    API.get(`/api/v1/${role}/class/${classId}/student`);
export const addStudentPost = formData => API.post("/api/v1/teacher/student", formData);
export const removeStudentDelete = (classId, studentId) =>
    API.delete(`/api/v1/teacher/class/${classId}/${studentId}`);

// Exam Api's
export const getExamGet = formData => API.get("/api/v1/teacher/exam");
export const addExamPost = formData => API.post("/api/v1/teacher/exam", formData);
export const removeExamDelete = examId => API.delete(`/api/v1/teacher/exam/${examId}`);
