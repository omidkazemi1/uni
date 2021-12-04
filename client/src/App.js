import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/user/profile/Profile";
import Classes from "./components/user/classes/Classes";
import NotFoundPage from "./components/notFountPage/NotFoundPage";
import Dashboard from "./components/user/dashboard/Dashboard";
import Exam from "./components/user/exam/Exam";
import Notification from "./components/user/notification/Notification";

import "./assets/fonts/css/style.css";
import { customTheme, RTL } from "./assets/theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
    return (
        <RTL>
            <ThemeProvider theme={customTheme}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="auth/login" element={<Login />} />
                        <Route path="auth/register" element={<Register />} />
                        <Route path="user" element={<Dashboard />}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="classes" element={<Classes />} />
                            <Route path="exam" element={<Exam />} />
                            <Route path="notification" element={<Notification />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </RTL>
    );
};

export default App;
