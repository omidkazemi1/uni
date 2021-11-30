import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(state => state.auth.authData);

    return <div>{user.firstName}</div>;
};

export default Profile;
