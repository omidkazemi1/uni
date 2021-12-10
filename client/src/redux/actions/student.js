import * as api from "../../api";
import {
    STUDENT_REQUEST,
    STUDENT_RESPONSE,
    STUDENT_ERROR,
    ADD_STUDENT_RESPONSE,
    REMOVE_STUDENT_RESPONSE,
    STUDENT_ERROR_EMPTY
} from "../../constants/actionTypes";

export const getStudents = classId => async dispatch => {
    try {
        dispatch({ type: STUDENT_REQUEST });
        const { data } = await api.getStudentsGet(classId);
        dispatch({ type: STUDENT_RESPONSE, payload: data.data.students });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: STUDENT_ERROR, payload: error.response });
    }
};

export const addStudent = formData => async dispatch => {
    try {
        dispatch({ type: STUDENT_REQUEST });
        const { data } = await api.addStudentPost(formData);

        dispatch({ type: ADD_STUDENT_RESPONSE, payload: data.data });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: STUDENT_ERROR, payload: error.response });
    }
};

export const removeStudent = (classId, studentId) => async dispatch => {
    try {
        dispatch({ type: STUDENT_REQUEST });
        const data = await api.removeStudentDelete(classId, studentId);

        console.log(data)

        if (data.status === 202) {
            dispatch({ type: REMOVE_STUDENT_RESPONSE, payload: studentId });
        }
    } catch (error) {
        console.log(error.response, error);
        dispatch({ type: STUDENT_ERROR, payload: error.response });
    }
};

export const setErrorEmpty = () => ({ type: STUDENT_ERROR_EMPTY });
