import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:4000" });


export const auth = () => API.get('/api/v1/teachers/auth')
export const loginPost = formData => API.post("/api/v1/teachers/login", formData );
export const registerPost = formData => API.post("/api/v1/teachers/signup", formData);
export const createCode = formData => API.post("/api/v1/teachers/code", formData); 
export const checkCode = formData => API.post("/api/v1/teachers/code/check", formData); 

