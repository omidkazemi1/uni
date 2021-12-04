import React, { useState } from "react";
import { FormHelperText, Grid, Paper, TextField } from "@mui/material";
import { SnackbarProvider } from "notistack";

import FormStepper from "../fromStepper/FromStepper";
import { Box } from "@mui/system";

const Login = () => {
    const [formData, setFormData] = useState({ phoneNumber: "", confirmCode: "" });
    const [formError, setFormError] = useState({ phoneNumber: false, confirmCode: false });

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
                    <Paper sx={{ padding: "20px" }}>
                        <FormStepper
                            formData={formData}
                            errorHandler={setFormError}
                            fromTitle="ورود به حساب"
                            formAction="LOGIN"
                            inputChangeHandler={inputChangeHandler}>
                            <Box>
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

export default Login;
