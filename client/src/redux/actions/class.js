import * as api from "../../api";
import {
    CLASS_REQUEST,
    CLASS_RESPONSE,
    CLASS_ERROR,
    CLASS_ERROR_EMPTY,
    ADD_CLASS_RESPONSE,
    EDIT_CLASS_RESPONSE,
    REMOVE_CLASS_RESPONSE
} from "../../constants/actionTypes";

export const getClasses = role => async dispatch => {
    try {
        dispatch({ type: CLASS_REQUEST });
        const { data } = await api.getClasses(role);

        dispatch({ type: CLASS_RESPONSE, payload: data.data.classes });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: CLASS_ERROR, payload: error.response });
    }
};

export const addClasses = formData => async dispatch => {
    try {
        dispatch({ type: CLASS_REQUEST });
        const { data } = await api.addClassesPost(formData);

        dispatch({ type: ADD_CLASS_RESPONSE, payload: data.data.class });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: CLASS_ERROR, payload: error.response });
    }
};

export const editClasses = (formData, classId) => async dispatch => {
    try {
        dispatch({ type: CLASS_REQUEST });
        const { data } = await api.editClassesPatch(formData, classId);
        dispatch({ type: EDIT_CLASS_RESPONSE, payload: data.data.class });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: CLASS_ERROR, payload: error.response });
    }
};

export const removeClasses = classId => async dispatch => {
    try {
        dispatch({ type: CLASS_REQUEST });
        const data = await api.removeClassesDelete(classId);

        if (data.status === 204) {
            dispatch({ type: REMOVE_CLASS_RESPONSE, payload: classId });
        }
    } catch (error) {
        console.log(error.response, error);
        dispatch({ type: CLASS_ERROR, payload: error.response });
    }
};

export const setErrorEmpty = () => ({ type: CLASS_ERROR_EMPTY });
