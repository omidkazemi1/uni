import React, { useState } from "react";
import { Button, FormHelperText, Grid, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [fromError, setFromError] = useState({ email: false, password: false });

    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const submitHandler = event => {
        event.preventDefault();

        if (formData.password === "") {
            setFromError(prevState => ({ ...prevState, password: true }));
        }

        console.log(fromError.email);


        if (formData.email === "") {
            setFromError(prevState => ({ ...prevState, email: true }));
        }

    };

    return (
        <Grid container justifyContent="center" alignItems="center" height="100vh">
            <Grid item xs="12" sm="9" md="6" lg="4">
                <Paper sx={{ padding: "20px" }}>
                    <form onSubmit={submitHandler} noValidate>
                        <Typography variant="h3" textAlign="center" marginBottom="3rem">
                            Login
                        </Typography>

                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            error={fromError.email}
                            onChange={inputChangeHandler}
                        />
                        <FormHelperText id="my-helper-text">Enter your email</FormHelperText>

                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            error={fromError.password}
                            onChange={inputChangeHandler}
                        />
                        <FormHelperText id="my-helper-text">Enter your password</FormHelperText>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ marginTop: "2rem" }}>
                            Login
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
