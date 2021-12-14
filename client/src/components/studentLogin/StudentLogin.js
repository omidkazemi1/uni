import React, { useState } from "react";
import { FormHelperText, Grid, Paper, TextField, Box, Button } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { motion } from "framer-motion";
import FormStepper from "../formStepper/FormStepper";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        phoneNumber: "",
        nationalCode: "",
        confirmCode: ""
    });
    const [formError, setFormError] = useState({
        phoneNumber: false,
        nationalCode: false,
        confirmCode: false
    });

    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <SnackbarProvider>
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <Grid item xs={12} sm={9} md={6} lg={4}>
                    <Paper sx={{ padding: "20px", overflow: "hidden" }}>
                        <FormStepper
                            formData={formData}
                            errorHandler={setFormError}
                            fromTitle="ورود دانش آموزن"
                            formAction="LOGIN"
                            role="student"
                            inputChangeHandler={inputChangeHandler}>
                            <Box
                                component={motion.div}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}>
                                <TextField
                                    name="phoneNumber"
                                    label="شماره موبایل"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.phoneNumber}
                                    error={formError.phoneNumber}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText error={formError.phoneNumber}>
                                    شماره موبایل خود را وارد کنید
                                </FormHelperText>

                                <TextField
                                    name="nationalCode"
                                    label="کد ملی"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.nationalCode}
                                    error={formError.nationalCode}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText error={formError.nationalCode}>
                                    کد ملی خود را وارد کنید
                                </FormHelperText>
                            </Box>

                            <Box
                                component={motion.div}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}>
                                <TextField
                                    name="confirmCode"
                                    label="کد تأیید"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.confirmCode}
                                    error={formError.confirmCode}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText error={formError.confirmCode}>
                                    کد ارسال شده را وارد کنید
                                </FormHelperText>
                            </Box>
                        </FormStepper>
                    </Paper>
                    <Button component={Link} to="/auth/login/teacher" fullWidth sx={{ mt: 3 }}>
                        ورود دانش معلمین
                    </Button>
                </Grid>
            </Grid>
        </SnackbarProvider>
    );
};

export default Login;
