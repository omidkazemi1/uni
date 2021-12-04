import {
    CLASS_ERROR,
    CLASS_ERROR_EMPTY,
    CLASS_REQUEST,
    CLASS_RESPONSE
} from "../../constants/actionTypes";

const initialState = {
    classDoc: null,
    loading: false,
    error: null
};

const classes = (state = initialState, action) => {
    switch (action.type) {
        case CLASS_REQUEST:
            return { ...state, loading: true };
        case CLASS_RESPONSE:
            return { ...state, classDoc: action.payload, loading: false };
        case CLASS_ERROR:
            return { ...state, error: action.payload, loading: false };
        case CLASS_ERROR_EMPTY:
            return { ...state, error: null };
        default:
            return state;
    }
};

export default classes;
