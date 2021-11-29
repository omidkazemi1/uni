import { AUTH, LOGOUT } from "../constants/actionTypes";

const auth = (user = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            return { ...user, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...user, authData: null };
        default:
            return user;
    }
};

export default auth;
