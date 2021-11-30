import { AUTH, LOGOUT } from "../constants/actionTypes";

const auth = (auth = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            return { ...auth, authData: action?.data };
        case LOGOUT:
            return { ...auth, authData: null };
        default:
            return auth;
    }
};

export default auth;
