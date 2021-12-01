import {
    AUTH_ERROR,
    AUTH_REQUEST,
    AUTH_RESPONSE,
    ERROR_EMPTY,
    LOGOUT_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_RESPONSE
} from "../../constants/actionTypes";

const initialState = {
    user: null,
    loading: false,
    error: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return { ...state, loading: true };
        case AUTH_RESPONSE:
            return { ...state, user: action.payload, loading: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload, loading: false };
        case LOGOUT_REQUEST:
            return { ...state, loading: true };
        case LOGOUT_RESPONSE:
            return { ...state, user: null, loading: false };
        case LOGOUT_ERROR:
            return { ...state, error: action.payload, loading: false };
        case ERROR_EMPTY:
            return { ...state, error: null };
        default:
            return state;
    }
};

export default auth;
