import React, { useEffect, useState } from "react";
import { Button, Grid, Grow, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTimer } from "use-timer";
import { useSnackbar } from "notistack";

import * as api from "../../api";
import { login, register, setErrorEmpty } from "../../redux/actions/auth";

const FormStepper = ({ children, formData, errorHandler, formAction, fromTitle }) => {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const [compeleteCountdown, setCompeleteCountdown] = useState(false);
    const currentChild = childrenArray[step];
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setErrorEmpty());
        user && navigate("/", { replace: true });
    }, [user, navigate, dispatch]);

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
                enqueueSnackbar("کد شما ارسال شد", {
                    variant: "success",
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    TransitionComponent: Grow
                });
            }
        } catch (err) {
            if (err.response.status === 405) {
                console.log(err.response.data.message);
                enqueueSnackbar(err.response.data.message, {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    TransitionComponent: Grow
                });
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
            let hasError = false;
            for (const input in formData) {
                if (formData[input] === "" && input !== "confirmCode") {
                    errorHandler(prevState => ({ ...prevState, [input]: true }));
                    hasError = true;
                }
            }

            if (!hasError) {
                setStep(step => step + 1);
                if (timerStaus === "STOPPED") {
                    startTimer();
                    createCode({ phoneNumber: formData.phoneNumber });
                }
            }
        }
    };

    const codeTimer = (time, reset) => {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        if (time) {
            return `ارسال مجدد: ${minutes < 10 ? "0" + minutes : minutes}:${
                seconds < 10 ? "0" + seconds : seconds
            }`;
        } else {
            return "ارسال مجدد";
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
            <Typography variant="h3" fontWeight="bold" textAlign="center" marginBottom="3rem">
                {fromTitle}
            </Typography>

            <Stepper activeStep={step} sx={{ marginBottom: "1rem" }}>
                {["اطلاعات شما", "احراز هویت"].map((label, index) => (
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
                            برگشت
                        </Button>
                    </Grid>
                ) : null}

                <Grid item xs={6}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        {isLastStep() ? fromTitle : "بعدی"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormStepper;
