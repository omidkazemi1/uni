import {
    ADD_EXAM_RESPONSE,
    EDIT_EXAM_RESPONSE,
    EXAM_ERROR,
    EXAM_ERROR_EMPTY,
    EXAM_REQUEST,
    EXAM_RESPONSE,
    REMOVE_EXAM_RESPONSE
} from "../../constants/actionTypes";

const initialState = {
    exams: [],
    loading: false,
    error: null
};

const exams = (state = initialState, action) => {
    switch (action.type) {
        case EXAM_REQUEST:
            return { ...state, loading: true };
        case EXAM_RESPONSE:
            return { ...state, exams: [...action.payload], loading: false };
        case ADD_EXAM_RESPONSE:
            return {
                ...state,
                exams: [...state.exams, action.payload],
                loading: false
            };
        case EDIT_EXAM_RESPONSE:
            return {
                ...state,
                exams: state.exams.map(exam =>
                    exam._id === action.payload._id ? action.payload : exam
                ),
                loading: false
            };
        case REMOVE_EXAM_RESPONSE:
            return {
                ...state,
                exams: state.exams.filter(exam => exam._id !== action.payload),
                loading: false
            };
        case EXAM_ERROR:
            return { ...state, error: action.payload, loading: false };
        case EXAM_ERROR_EMPTY:
            return { ...state, error: null };
        default:
            return state;
    }
};

export default exams;
