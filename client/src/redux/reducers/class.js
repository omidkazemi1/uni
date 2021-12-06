import {
    ADD_CLASS_RESPONSE,
    CLASS_ERROR,
    CLASS_ERROR_EMPTY,
    CLASS_REQUEST,
    CLASS_RESPONSE,
    EDIT_CLASS_RESPONSE,
    REMOVE_CLASS_RESPONSE
} from "../../constants/actionTypes";

const initialState = {
    classDocs: [],
    loading: false,
    error: null
};

const classes = (state = initialState, action) => {
    switch (action.type) {
        case CLASS_REQUEST:
            return { ...state, loading: true };
        case CLASS_RESPONSE:
            return { ...state, classDocs: [...action.payload], loading: false };
        case ADD_CLASS_RESPONSE:
            return {
                ...state,
                classDocs: [...state.classDocs, action.payload],
                loading: false
            };
        case EDIT_CLASS_RESPONSE:
            return {
                ...state,
                classDocs: state.classDocs.map(classDoc =>
                    classDoc._id === action.payload._id ? action.payload : classDoc
                ),
                loading: false
            };
        case REMOVE_CLASS_RESPONSE:
            return {
                ...state,
                classDocs: state.classDocs.filter(classDoc => classDoc._id !== action.payload),
                loading: false
            };
        case CLASS_ERROR:
            return { ...state, error: action.payload, loading: false };
        case CLASS_ERROR_EMPTY:
            return { ...state, error: null };
        default:
            return state;
    }
};

export default classes;
