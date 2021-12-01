import { Routes, Route } from "react-router-dom";

import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/user/profile/Profile";

import "./assets/fonts/css/style.css";
import { customTheme, RTL } from "./assets/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const App = () => {
    return (
        <RTL>
            <ThemeProvider theme={customTheme}>
                <CssBaseline />

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
            </ThemeProvider>
        </RTL>
    );
};

export default App;
