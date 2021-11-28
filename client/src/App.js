import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <nav>
                    <Link to="/">Home</Link>{" "}
                    <Link to="/auth/login">Login</Link>{" "}
                    <Link to="/auth/register">Register</Link>{" "}
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="auth/login" element={<Login />} />
                    <Route path="auth/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
