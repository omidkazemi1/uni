import * as api from "../api";
import { AUTH, LOGOUT } from "../constants/actionTypes";

export const auth = () => async dispatch => {
    try {
        const { data } = await api.authGet();

        dispatch({ type: AUTH, data: data.data.user });
    } catch (error) {
        console.log(error.response);
    }
};

export const logout = navigate => async dispatch => {
    try {
        const { data } = await api.logoutGet();

        dispatch({ type: LOGOUT });
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error.response);
    }
};

export const login = (formData, navigate) => async dispatch => {
    try {
        const { data } = await api.loginPost(formData);

        dispatch({ type: AUTH, data: data.data.user });
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
    }
};

export const register = (formData, navigate) => async dispatch => {
    try {
        const { data } = await api.registerPost(formData);

        dispatch({ type: AUTH, data: data.data.user });
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error.response);
    }
};
