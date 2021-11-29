import axios from "axios";
axios.defaults.withCredentials = true
const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use(req => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    return req;
});

export const signIn = formData => API.post("/api/v1/teachers/signin", formData );
export const signUp = formData => API.post("/api/v1/teachers/signup", formData);

