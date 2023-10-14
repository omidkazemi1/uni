import React, { useState } from "react";
import { FormHelperText, Grid, Paper, TextField, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

import FormStepper from "../formStepper/FormStepper";
import { motion } from "framer-motion";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nationalCode: "",
        phoneNumber: "",
        confirmCode: ""
    });

    const [formError, setFormError] = useState({
        firstName: false,
        lastName: false,
        nationalCode: false,
        phoneNumber: false,
        confirmCode: false
    });
    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setFormError(prevState => ({ ...prevState, [event.target.name]: false }));
    };

    return (
        <SnackbarProvider>
            <Grid container justifyContent="center" alignItems="center" py={4}>
                <Grid item xs={12} sm={9} md={6} lg={4}>
                    <Paper sx={{ padding: "20px", overflow: "hidden" }}>
                        <FormStepper
                            formData={formData}
                            errorHandler={setFormError}
                            fromTitle="ثبت نام"
                            formAction="REGISTER"
                            inputChangeHandler={inputChangeHandler}>
                            <Box
                                layout
                                component={motion.div}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}>
                                <TextField
                                    name="firstName"
                                    label="نام"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.firstName}
                                    error={formError.firstName}
                                    onChange={inputChangeHandler}
                                />

                                <TextField
                                    name="lastName"
                                    label="نام خانوادگی"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.lastName}
                                    error={formError.lastName}
                                    onChange={inputChangeHandler}
                                />

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
                            </Box>

                            <Box
                                layout
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
                </Grid>
            </Grid>
        </SnackbarProvider>
    );
};

export default Register;
