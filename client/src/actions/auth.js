import * as api from "../api";

export const signin = (formData, history) => async dispatch => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: "AUTH", data });
        history.push("/");
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, navigate) => async dispatch => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: "AUTH", data: data.data.user });
        navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
    }
};

export const createCode = phoneNumber => async dispatch => {
    try {
        dispatch({ type: "CREATECODE_REQUEST" });
        const { data } = await api.createCode(phoneNumber);

        console.log(data);

        dispatch({ type: "CREATECODE_RESPONSE" });
    } catch (error) {
        console.log(error);
    }
};
