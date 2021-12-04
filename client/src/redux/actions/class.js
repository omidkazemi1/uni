import * as api from "../../api";
import {
    CLASS_REQUEST,
    CLASS_RESPONSE,
    CLASS_ERROR,
    CLASS_ERROR_EMPTY
} from "../../constants/actionTypes";

export const getClasses = () => async dispatch => {
    try {
        dispatch({ type: CLASS_REQUEST });
        const { data } = await api.getClasses();
        console.log(data);
        dispatch({ type: CLASS_RESPONSE, payload: data.data.classes });
    } catch (error) {
        console.log(error.response);
        dispatch({ type: CLASS_ERROR, payload: error.response });
    }
};

export const setErrorEmpty = () => ({ type: CLASS_ERROR_EMPTY });
