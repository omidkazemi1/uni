import React, { useState } from "react";
import { FormHelperText, Grid, Paper, TextField, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

import FormStepper from "../fromStepper/FromStepper";

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
            <Grid container justifyContent="center" alignItems="center" marginTop="4rem">
                <Grid item xs={12} sm={9} md={6} lg={4}>
                    <Paper sx={{ padding: "20px" }}>
                        <FormStepper
                            formData={formData}
                            errorHandler={setFormError}
                            fromTitle="ثبت نام"
                            formAction="REGISTER"
                            inputChangeHandler={inputChangeHandler}>
                            <Box>
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
                                <FormHelperText error={formError.firstName}>
                                    نام خود را وارد کنید
                                </FormHelperText>

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
                                <FormHelperText error={formError.lastName}>
                                    نام خانوادگی خود را وارد کنید
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
                                    کد ملی را وارد کنید
                                </FormHelperText>

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
                            </Box>

                            <Box>
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
