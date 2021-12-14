import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormHelperText,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addStudent, getStudents, removeStudent } from "../../redux/actions/student";
import StudentCard from "../studentCard/StudentCard";

const Students = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogFromData, setDialogFromData] = useState({
        firstName: "",
        lastName: "",
        nationalCode: "",
        phoneNumber: ""
    });
    const [dialogFromError, setDialogFromError] = useState({
        firstName: false,
        lastName: false,
        nationalCode: false,
        phoneNumber: false
    });
    const {
        user: { role }
    } = useSelector(state => state.auth);

    const { classId } = useParams();
    const dispatch = useDispatch();
    const { students, loading } = useSelector(state => state.student);

    const inputChangeHandler = event => {
        setDialogFromData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setDialogFromError(prevState => ({ ...prevState, [event.target.name]: false }));
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogFromData({ firstName: "", lastName: "", nationalCode: "", phoneNumber: "" });
    };

    const handleDialogSabmit = event => {
        event.preventDefault();
        setDialogFromError({ name: false, grade: false });

        let hasError = false;
        for (const input in dialogFromData) {
            if (dialogFromData[input].trim() === "") {
                console.log(input);
                setDialogFromError(prevState => ({ ...prevState, [input]: true }));
                hasError = true;
            }
        }

        if (!hasError) {
            dispatch(addStudent({ ...dialogFromData, classId }));
            handleDialogClose();
            setDialogFromData({
                firstName: "",
                lastName: "",
                nationalCode: "",
                phoneNumber: ""
            });
        }
    };

    const handleRemoveStudent = studentId => {
        dispatch(removeStudent(classId, studentId));
    };

    useEffect(() => {
        dispatch(getStudents(classId, role));
    }, [dispatch, classId, role]);

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between"></Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    my={4}
                    sx={{ display: "flex", alignItems: "center" }}>
                    لیست دانش آموزان
                    {loading && <CircularProgress size={25} sx={{ mx: 1 }} />}
                </Typography>

                {role === "teacher" && (
                    <Button
                        variant="outlined"
                        onClick={handleDialogOpen}
                        startIcon={<FaPlus />}>
                        افزودن دانش آموز
                    </Button>
                )}

                <Dialog open={dialogOpen} maxWidth="sm" fullWidth onClose={handleDialogClose}>
                    <DialogTitle>افزودن دانش آموز</DialogTitle>
                    <form onSubmit={handleDialogSabmit}>
                        <DialogContent>
                            <TextField
                                size="small"
                                name="firstName"
                                value={dialogFromData.firstName}
                                error={dialogFromError.firstName}
                                onChange={inputChangeHandler}
                                fullWidth
                                label="نام"
                            />
                            <FormHelperText error={dialogFromError.firstName}>
                                نام را وارد کنید
                            </FormHelperText>

                            <TextField
                                size="small"
                                name="lastName"
                                value={dialogFromData.lastName}
                                error={dialogFromError.lastName}
                                onChange={inputChangeHandler}
                                fullWidth
                                label="نام خانوادگی"
                                sx={{ mt: 3 }}
                            />
                            <FormHelperText error={dialogFromError.lastName}>
                                نام خانوادگی را وارد کنید
                            </FormHelperText>

                            <TextField
                                size="small"
                                name="nationalCode"
                                value={dialogFromData.nationalCode}
                                error={dialogFromError.nationalCode}
                                onChange={inputChangeHandler}
                                fullWidth
                                label="کد ملی"
                                sx={{ mt: 3 }}
                            />
                            <FormHelperText error={dialogFromError.nationalCode}>
                                کد ملی را وارد کنید
                            </FormHelperText>

                            <TextField
                                size="small"
                                name="phoneNumber"
                                value={dialogFromData.phoneNumber}
                                error={dialogFromError.phoneNumber}
                                onChange={inputChangeHandler}
                                fullWidth
                                label="شماره موبایل"
                                sx={{ mt: 3 }}
                            />
                            <FormHelperText error={dialogFromError.phoneNumber}>
                                شماره موبایل را وارد کنید
                            </FormHelperText>
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit">ثبت</Button>
                            <Button color="error" onClick={handleDialogClose}>
                                لغو
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Stack>

            <Grid container my={2} sx={{ display: { xs: "none", md: "flex" } }}>
                <Grid
                    item
                    xs={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                    <Typography vairant="body1" fontWeight="bold" mx={1}>
                        نام
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                    <Typography vairant="body1" fontWeight="bold">
                        شماره موبایل
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                    <Typography vairant="body1" fontWeight="bold">
                        کد ملی
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Typography vairant="body1" fontWeight="bold">
                        تنظیمات
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={4} mt={1}>
                {loading
                    ? null
                    : students.map(student => (
                          <StudentCard
                              student={student}
                              key={student._id}
                              handleRemoveStudent={handleRemoveStudent}
                          />
                      ))}
            </Grid>
        </>
    );
};

export default Students;
