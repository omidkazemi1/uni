import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/user/profile/Profile";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <nav>
                    <Nav />
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="auth/login" element={<Login />} />
                    <Route path="auth/register" element={<Register />} />
                    <Route path="user/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
