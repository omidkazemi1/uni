import {
    AUTH,
    LOGOUT,
    CREATECODE_REQUEST,
    CREATECODE_RESPONSE
} from "../constants/actionTypes";

const auth = (auth = { authData: null, createCodeLoading: false }, action) => {
    switch (action.type) {
        case CREATECODE_REQUEST:
            return { ...auth, createCodeLoading: true };
        case CREATECODE_RESPONSE:
            return { ...auth, createCodeLoading: false };
        case AUTH:
            return { ...auth, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...auth, authData: null };
        default:
            return auth;
    }
};

export default auth;
