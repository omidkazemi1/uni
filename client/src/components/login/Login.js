import React, { useState } from "react";
import { Button, FormHelperText, Grid, Paper, TextField, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";

import FormStepper from "../fromStepper/FromStepper";
import { Box } from "@mui/system";

const Login = () => {
    const [formData, setFormData] = useState({ phoneNumber: "", confirmCode: "" });

    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const submitHandler = event => {
        event.preventDefault();
    };

    return (
        <SnackbarProvider>
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <Grid item xs="12" sm="9" md="6" lg="4">
                    <Paper sx={{ padding: "20px" }}>
                        <FormStepper
                            formData={formData}
                            fromTitle="Login"
                            formAction="LOGIN"
                            inputChangeHandler={inputChangeHandler}>
                            <Box>
                                <TextField
                                    name="phoneNumber"
                                    label="Phone Number"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.phoneNumber}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText id="my-helper-text">
                                    Enter your phone number
                                </FormHelperText>
                            </Box>

                            <Box>
                                <TextField
                                    name="confirmCode"
                                    label="Confirm Code"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.confirmCode}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText id="my-helper-text">
                                    Enter sent code
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
