import {
    AUTH,
    LOGOUT
} from "../constants/actionTypes";

const auth = (auth = { authData: null, createCodeLoading: false }, action) => {
    switch (action.type) {
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
