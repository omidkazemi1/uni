import { AUTH, LOGOUT } from "../constants/actionTypes";

const auth = (auth = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action.data, 'reducer')
            return { ...auth, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...auth, authData: null };
        default:
            return auth;
    }
};

export default auth;
