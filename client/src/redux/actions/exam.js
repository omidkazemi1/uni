import * as api from "../../api";
import { ADD_EXAM_RESPONSE, EDIT_EXAM_RESPONSE, EXAM_ERROR, EXAM_ERROR_EMPTY, EXAM_REQUEST, EXAM_RESPONSE, REMOVE_EXAM_RESPONSE } from "../../constants/actionTypes";


export const getExams = (role) => async dispatch => {
    try {
        dispatch({ type: EXAM_REQUEST });
        const { data } = await api.getExamsGet(role);

        dispatch({ type: EXAM_RESPONSE, payload: data.data.exams });
    } catch (error) {
        console.log(error);
        dispatch({ type: EXAM_ERROR, payload: error.response });
    }
};

export const addExam = (formData, navigate) => async dispatch => {
    try {
        console.log(formData)
        dispatch({ type: EXAM_REQUEST });
        const { data } = await api.addExamPost(formData);
        dispatch({ type: ADD_EXAM_RESPONSE, payload: data.data.exam });
        navigate("/user/exam", { replace: true });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: EXAM_ERROR, payload: error.response });
    }
};

export const editClasses = (formData, classId) => async dispatch => {
    try {
        dispatch({ type: EXAM_REQUEST });
        const { data } = await api.editClassesPatch(formData, classId);
        dispatch({ type: EDIT_EXAM_RESPONSE, payload: data.data.class });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: EXAM_ERROR, payload: error.response });
    }
};

export const removeExam = examId => async dispatch => {
    try {
        dispatch({ type: EXAM_REQUEST });
        const data = await api.removeExamDelete(examId);

        console.log(data)

        if (data.status === 204) {
            dispatch({ type: REMOVE_EXAM_RESPONSE, payload: examId });
        }
    } catch (error) {
        console.log(error.response, error);
        dispatch({ type: EXAM_ERROR, payload: error.response });
    }
};

export const setErrorEmpty = () => ({ type: EXAM_ERROR_EMPTY });
