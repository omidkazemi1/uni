import {
    STUDENT_RESPONSE,
    STUDENT_REQUEST,
    STUDENT_ERROR,
    STUDENT_ERROR_EMPTY,
    ADD_STUDENT_RESPONSE,
    EDIT_STUDENT_RESPONSE,
    REMOVE_STUDENT_RESPONSE
} from "../../constants/actionTypes";

const initialState = {
    students: [],
    loading: false,
    error: null
};

const student = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_REQUEST:
            return { ...state, loading: true };
        case STUDENT_RESPONSE:
            return { ...state, students: [...action.payload], loading: false };
        case ADD_STUDENT_RESPONSE:
            return {
                ...state,
                students: [...state.students, action.payload],
                loading: false
            };
        case EDIT_STUDENT_RESPONSE:
            return {
                ...state,
                students: state.students.map(student =>
                    student._id === action.payload._id ? action.payload : student
                ),
                loading: false
            };
        case REMOVE_STUDENT_RESPONSE:
            return {
                ...state,
                students: state.students.filter(student => student._id !== action.payload),
                loading: false
            };
        case STUDENT_ERROR:
            return { ...state, error: action.payload, loading: false };
        case STUDENT_ERROR_EMPTY:
            return { ...state, error: null };
        default:
            return state;
    }
};

export default student;
