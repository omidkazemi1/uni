import React, { useEffect, useState } from "react";
import { Button, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTimer } from "use-timer";
import { useSnackbar } from "notistack";

import * as api from "../../api";
import { login, register, setErrorEmpty } from "../../actions/auth";

const FormStepper = ({ children, formData, formAction, fromTitle }) => {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const [compeleteCountdown, setCompeleteCountdown] = useState(false);
    const currentChild = childrenArray[step];
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setErrorEmpty());
        user && navigate("/", { replace: false });
    }, [user, navigate]);

    const {
        time: timer,
        start: startTimer,
        reset: resetTimer,
        pause: pauseTimer,
        status: timerStaus
    } = useTimer({
        autostart: false,
        initialTime: 120,
        timerType: "DECREMENTAL",
        onTimeUpdate: () => {
            if (timer === 0) {
                pauseTimer();
                setCompeleteCountdown(true);
            }
        }
    });

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    async function createCode(phoneNumber) {
        try {
            const data = await api.createCode(phoneNumber);
            if (data.status === 201) {
                enqueueSnackbar("Sent Code", { variant: "success" });
            }
        } catch (err) {
            if (err.response.status === 405) {
                console.log(err.response.data.message);
                enqueueSnackbar(err.response.data.message, { variant: "error" });
            }
        }
    }

    const submitHandler = event => {
        event.preventDefault();

        if (isLastStep()) {
            if (formAction === "LOGIN") {
                dispatch(login(formData));
            } else if (formAction === "REGISTER") {
                dispatch(register(formData));
            }
        } else {
            if (timerStaus === "STOPPED") {
                startTimer();
                createCode({ phoneNumber: formData.phoneNumber });
            }

            setStep(step => step + 1);
        }
    };

    const codeTimer = (time, reset) => {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        if (time) {
            return `Resend after: ${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
            }`;
        } else {
            return "Resend";
        }
    };

    const countdownClickHandler = () => {
        setCompeleteCountdown(false);
        createCode({ phoneNumber: formData.phoneNumber });
        resetTimer();
        startTimer();
    };

    return (
        <form onSubmit={submitHandler} noValidate>
            <Typography variant="h3" textAlign="center" marginBottom="3rem">
                {fromTitle}
            </Typography>

            <Stepper activeStep={step} sx={{ marginBottom: "1rem" }}>
                {["Information", "Authorizion"].map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {currentChild}

            <Grid container spacing={2} marginTop="1rem">
                {isLastStep() && (
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            fullWidth
                            disabled={compeleteCountdown ? false : true}
                            sx={{ marginTop: "1rem" }}
                            onClick={countdownClickHandler}>
                            {codeTimer(timer, resetTimer)}
                        </Button>
                    </Grid>
                )}

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
                        {isLastStep() ? fromTitle : "Next"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormStepper;
