import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/user/profile/Profile";
import { auth } from "./actions/auth";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("get auth");
        dispatch(auth());
    });

    return (
        <>
            <BrowserRouter>
                <nav>
                    <Nav />
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="auth/login" element={<Login />} />
                    <Route path="auth/register" element={<Register />} />
                    <Route path="user/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
