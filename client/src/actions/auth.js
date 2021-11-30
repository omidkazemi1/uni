import * as api from "../api";

export const login = (formData, navigate) => async dispatch => {
    try {
        const { data } = await api.loginPost(formData);

        console.log(data)

        dispatch({ type: "AUTH", data: data.data.user });
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
    }
};

export const register = (formData, navigate) => async dispatch => {
    try {
        const { data } = await api.registerPost(formData);

        console.log(data);

        dispatch({ type: "AUTH", data: data.data.user });
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error.response);
    }
};
