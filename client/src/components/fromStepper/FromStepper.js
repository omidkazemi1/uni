import React, { useState } from "react";
import { Button, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTimer } from "use-timer";

import { createCode, signup } from "../../actions/auth";

const FormStepper = ({ children, formData }) => {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const [compeleteCountdown, setCompeleteCountdown] = useState(false);
    const currentChild = childrenArray[step];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => {
        console.log(state);
        return state;
    });
	
    const { time, start, reset, pause } = useTimer({
        autostart: false,
        initialTime: 4,
        timerType: "DECREMENTAL",
        onTimeUpdate: () => {
            if (time === 0) {
                pause();
                setCompeleteCountdown(true);
            }
        }
    });

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    const submitHandler = event => {
        event.preventDefault();

        if (isLastStep()) {
            dispatch(signup(formData, navigate));
        } else {
            start();
            setStep(step => step + 1);
            dispatch(createCode(formData.confirmCode));
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
        reset();
        start();
    };

    return (
        <form onSubmit={submitHandler} noValidate>
            <Typography variant="h3" textAlign="center" marginBottom="3rem">
                Register
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
                        <LoadingButton
                            variant="outlined"
                            endIcon={<MdMailOutline />}
                            fullWidth
                            disabled={compeleteCountdown ? false : true}
                            sx={{ marginTop: "1rem" }}
                            onClick={countdownClickHandler}>
                            {codeTimer(time, reset)}
                        </LoadingButton>
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
                        {isLastStep() ? "Submit" : "Next"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormStepper;
