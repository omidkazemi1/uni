import React, { useState } from "react";
import {
    Button,
    FormHelperText,
    Grid,
    Paper,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";

import { signup } from "../../actions/auth";
import { Box } from "@mui/system";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nationalCode: "",
        phoneNumber: "",
        confirmCode: ""
    });
    const [fromError, setFromError] = useState({
        firstName: false,
        lastName: false,
        nationalCode: false,
        phoneNumber: false
    });

    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <Grid container justifyContent="center" alignItems="center" marginTop="4rem">
            <Grid item xs="12" sm="9" md="6" lg="4">
                <Paper sx={{ padding: "20px" }}>
                    <FormStepper
                        formData={formData}
                        fromError={fromError}
                        inputChangeHandler={inputChangeHandler}>
                        {/* Infomation Step */}
                        <Box>
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
                                label="Phone Number"
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
                        </Box>

                        {/* Authorizaion Step */}
                        <Box>
                            <TextField
                                name="confirmCode"
                                label="Confirm Code"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={formData.confirmCode}
                                error={fromError.confirmCode}
                                onChange={inputChangeHandler}
                            />
                            <FormHelperText id="my-helper-text">
                                Enter sent code
                            </FormHelperText>

                            <Button variant="outlined" fullWidth sx={{ marginTop: "1rem" }}>
                                <Countdown
                                    date={Date.now() + 1000 * 120}
                                    renderer={CountdownRender}
                                />
                            </Button>
                        </Box>
                    </FormStepper>
                </Paper>
            </Grid>
        </Grid>
    );
};

const FormStepper = ({ children, formData, fromError, inputChangeHandler }) => {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const [stepLables, setStepLables] = useState(["Information", "Authorizion"]);
    const currentChild = childrenArray[step];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    const submitHandler = event => {
        event.preventDefault();

        if (isLastStep()) {
            dispatch(signup(formData, navigate));
        } else {
            setStep(step => step + 1);
        }
    };

    return (
        <form onSubmit={submitHandler} noValidate>
            <Typography variant="h3" textAlign="center" marginBottom="3rem">
                Register
            </Typography>

            <Stepper activeStep={step} sx={{ marginBottom: "1rem" }}>
                {stepLables.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {currentChild}

            <Grid container spacing={2} marginTop="1rem">
                {step > 0 ? (
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => setStep(step => step - 1)}>
                            Back
                        </Button>
                    </Grid>
                ) : null}
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        {isLastStep() ? "Submit" : "Next"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const CountdownRender = ({ minutes, seconds, completed }) => {
    if (completed) {
        // Render a complete state
        return <span>Resend Again</span>;
    } else {
        // Render a countdown
        return (
            <span>
                Resend after: &nbsp;
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
            </span>
        );
    }
};

export default Register;
