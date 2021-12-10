import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:4000" });

// Teacher Api's
export const updateTeacherPatch = formData => API.patch("/api/v1/teachers", formData);
export const authGet = () => API.get("/api/v1/teachers/auth");
export const logoutGet = () => API.get("/api/v1/teachers/logout");
export const loginPost = formData => API.post("/api/v1/teachers/login", formData);
export const registerPost = formData => API.post("/api/v1/teachers/signup", formData);
export const createCode = formData => API.post("/api/v1/teachers/code", formData);
export const checkCode = formData => API.post("/api/v1/teachers/code/check", formData);

// Class Api's
export const getClasses = () => API.get("/api/v1/teachers/class");
export const addClassesPost = formData => API.post("/api/v1/teachers/class", formData);
export const editClassesPatch = (formData, classId) =>
    API.patch(`/api/v1/teachers/class/${classId}`, formData);
export const removeClassesDelete = classId => API.delete(`/api/v1/teachers/class/${classId}`);

// Student Api's
export const getStudentsGet = classId => API.get(`/api/v1/teachers/class/${classId}/student`);
export const addStudentPost = formData => API.post("/api/v1/teachers/student", formData);
export const removeStudentDelete = (classId, studentId) =>
    API.delete(`/api/v1/teachers/class/${classId}/${studentId}`);


// Exam Api's
export const addExamPost = formData => API.post('/api/v1/teachers/exam', formData)