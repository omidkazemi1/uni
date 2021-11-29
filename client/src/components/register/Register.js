import React, { useState } from "react";
import { Button, FormHelperText, Grid, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { signup } from "../../actions/auth";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nationalCode: "",
        phoneNumber: ""
    });
    const [fromError, setFromError] = useState({
        firstName: false,
        lastName: false,
        nationalCode: false,
        phoneNumber: false
    });
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const submitHandler = event => {
        event.preventDefault();

        dispatch(signup(formData, navigate));
    };

    return (
        <Grid container justifyContent="center" alignItems="center" marginTop="4rem">
            <Grid item xs="12" sm="9" md="6" lg="4">
                <Paper sx={{ padding: "20px" }}>
                    <form onSubmit={submitHandler} noValidate>
                        <Typography variant="h3" textAlign="center" marginBottom="3rem">
                            Register
                        </Typography>

                        <TextField
                            name="firstName"
                            label="Frist Name"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.firstName}
                            error={fromError.firstName}
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
                            error={fromError.lastName}
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
                            error={fromError.natinalCode}
                            onChange={inputChangeHandler}
                        />
                        <FormHelperText id="my-helper-text">
                            Enter your national code
                        </FormHelperText>

                        <TextField
                            name="phoneNumber"
                            label="Last Name"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.phoneNumber}
                            error={fromError.phoneNumber}
                            onChange={inputChangeHandler}
                        />
                        <FormHelperText id="my-helper-text">
                            Enter your phone number
                        </FormHelperText>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ marginTop: "2rem" }}>
                            Register
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
