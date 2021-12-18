import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Logout from "./components/logout/Logout";
import TeacherLogin from "./components/teacherLogin/TeacherLogin";
import StudentLogin from "./components/studentLogin/StudentLogin";
import Register from "./components/register/Register";
import Profile from "./components/user/profile/Profile";
import Classes from "./components/user/classes/Classes";
import NotFoundPage from "./components/notFountPage/NotFoundPage";
import Dashboard from "./components/user/dashboard/Dashboard";
import Exams from "./components/user/exams/Exams";
import Notification from "./components/user/notification/Notification";
import Students from "./components/students/Students";
import AddExam from "./components/addExam/AddExam";
import ExamDetailsStudent from "./components/examDetailsStudent/ExamDetailsStudent";
import ExamDetailsTeacher from "./components/examDetailsTeacher/ExamDetailsTeacher";
import Exam from "./components/exam/Exam";
import StudentExamLog from "./components/studentExamLog/StudentExamLog";

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
                        <Route path="auth/login/teacher" element={<TeacherLogin />} />
                        <Route path="auth/login/student" element={<StudentLogin />} />
                        <Route path="auth/register" element={<Register />} />
                        <Route path="user" element={<Dashboard />}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="classes" element={<Classes />} />
                            <Route path="classes/students/:classId" element={<Students />} />
                            <Route path="exam" element={<Exams />} />
                            <Route path="exam/add" element={<AddExam />} />
                            <Route path="exam/:examId" element={<Exam />} />
                            <Route
                                path="exam/details/:examId/student"
                                element={<ExamDetailsStudent />}
                            />
                            <Route
                                path="exam/details/:examId/teacher"
                                element={<ExamDetailsTeacher />}
                            />
                            <Route
                                path="exam/details/student/:examId/:studentId/teacher"
                                element={<StudentExamLog />}
                            />
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
