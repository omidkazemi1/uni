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

    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <SnackbarProvider>
            <Grid container justifyContent="center" alignItems="center" marginTop="4rem">
                <Grid item xs="12" sm="9" md="6" lg="4">
                    <Paper sx={{ padding: "20px" }}>
                        <FormStepper
                            formData={formData}
                            fromTitle="Register"
                            formAction="REGISTER"
                            inputChangeHandler={inputChangeHandler}>

                            <Box>
                                <TextField
                                    name="firstName"
                                    label="Frist Name"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.firstName}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText id="my-helper-text">
                                    Enter your first name
                                </FormHelperText>

                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.lastName}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText id="my-helper-text">
                                    Enter your last name
                                </FormHelperText>

                                <TextField
                                    name="nationalCode"
                                    label="National Code"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    value={formData.natinalCode}
                                    onChange={inputChangeHandler}
                                />
                                <FormHelperText id="my-helper-text">
                                    Enter your national code
                                </FormHelperText>

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

export default Register;
