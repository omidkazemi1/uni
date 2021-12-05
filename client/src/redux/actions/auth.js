import * as api from "../../api";
import {
    AUTH_ERROR,
    AUTH_REQUEST,
    AUTH_RESPONSE,
    AUTH_ERROR_EMPTY,
    LOGOUT_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_RESPONSE
} from "../../constants/actionTypes";

export const updateTeacher = formData => async dispatch => {
    try {
        dispatch({ type: AUTH_REQUEST });
        const { data } = await api.updateTeacherPatch(formData);
        dispatch({ type: AUTH_RESPONSE, payload: data.data.user });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: AUTH_ERROR, error: error.response });
    }
};

export const auth = () => async dispatch => {
    try {
        dispatch({ type: AUTH_REQUEST });
        const { data } = await api.authGet();
        dispatch({ type: AUTH_RESPONSE, payload: data.data.user });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: AUTH_ERROR, error: error.response });
    }
};

export const logout = () => async dispatch => {
    try {
        dispatch({ type: LOGOUT_REQUEST });
        await api.logoutGet();
        dispatch({ type: LOGOUT_RESPONSE });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: LOGOUT_ERROR });
    }
};

export const login = formData => async dispatch => {
    try {
        dispatch({ type: AUTH_REQUEST });
        const { data } = await api.loginPost(formData);
        dispatch({ type: AUTH_RESPONSE, payload: data.data.user });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: AUTH_ERROR, error: error.response });
    }
};

export const register = formData => async dispatch => {
    try {
        dispatch({ type: AUTH_REQUEST });
        const { data } = await api.registerPost(formData);
        dispatch({ type: AUTH_RESPONSE, payload: data.data.user });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: AUTH_ERROR, error: error.response });
    }
};

export const setErrorEmpty = () => ({ type: AUTH_ERROR_EMPTY });
