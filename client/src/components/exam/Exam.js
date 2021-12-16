import {
    Button,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Grow,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import * as api from "../../api";
import { useSnackbar } from "notistack";

const Exam = () => {
    const { examId } = useParams();
    const [exam, setExam] = useState({});
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [answersError, setAnswersError] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const getExam = async () => {
            try {
                setLoading(true);
                const {
                    data: {
                        data: { exam }
                    }
                } = await api.getExamStudentGet(examId);

                console.log(exam);

                setExam({ ...exam });
                setLoading(false);
            } catch (error) {
                console.log(error, error.response);
            }
        };

        getExam();
    }, [examId]);

    useEffect(() => {
        if (exam.questions) {
            let answers = {};
            exam.questions.forEach(question => (answers[question._id] = ""));
            setAnswers(answers);

            let answersError = {};
            for (const key in answers) {
                answersError[key] = false;
            }
            setAnswersError(answersError);
        }
    }, [exam]);

    const completeExam = async () => {
        const formData = {
            exam: examId,
            questions: []
        };

        for (const key in answers) {
            formData.questions.push({ question: key, selectedOption: answers[key] });
        }

        try {
            setLoading(true);
            const response = await api.completeExamPost(formData);
            if (response.status === 200) {
                enqueueSnackbar("آزمون شما ثبت شد، موفق باشید:)", {
                    variant: "success",
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    TransitionComponent: Grow
                });
                navigate('/user/exam')
            }

            setLoading(false);
        } catch (error) {
            console.log(error?.response);
        }
    };

    const answerHandler = event => {
        setAnswers(pervState => ({ ...pervState, [event.target.name]: event.target.value }));
        setAnswersError(pervState => ({ ...pervState, [event.target.name]: false }));
    };

    const submitHandler = event => {
        event.preventDefault();

        let hasError = false;
        for (const key in answers) {
            if (answers[key] === "") {
                setAnswersError(pervState => ({ ...pervState, [key]: true }));
                hasError = true;
            }
        }

        if (!hasError) {
            completeExam();
        }
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                    component={motion.h5}
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    variant="h5"
                    fontWeight="bold"
                    my={4}>
                    {exam.name}
                    {loading && <CircularProgress size={25} sx={{ mx: 1 }} />}
                </Typography>

                <Box display="flex" alignItems="baseline">
                    <Typography variant="body1" mx={1} noWrap>
                        مدت زمان امتحان:
                    </Typography>
                    <Typography variant="body2" mx={1} noWrap>
                        {exam.duration} دقیقه
                    </Typography>
                </Box>
            </Stack>

            <form onSubmit={submitHandler}>
                {!loading && (
                    <Grid container py={3} justifyContent="center" component={Paper} px={3}>
                        {exam.questions.map((question, index) => (
                            <Grid key={index} item xs={12}>
                                <FormLabel>{`سوال ${index + 1}`}</FormLabel>
                                <Typography variant="body1" mb={3}>
                                    {question.body}
                                </Typography>
                                <FormControl
                                    error={answersError[question._id]}
                                    component="fieldset">
                                    <FormLabel component="legend">پاسخ ها</FormLabel>
                                    <RadioGroup onChange={answerHandler} name={question._id}>
                                        <FormControlLabel
                                            variant="body1"
                                            value="1"
                                            control={<Radio />}
                                            label={question.answer1}
                                        />
                                        <FormControlLabel
                                            value="2"
                                            control={<Radio />}
                                            label={question.answer2}
                                        />
                                        <FormControlLabel
                                            value="3"
                                            control={<Radio />}
                                            label={question.answer3}
                                        />
                                        <FormControlLabel
                                            value="4"
                                            control={<Radio />}
                                            label={question.answer4}
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Divider sx={{ my: 3 }} />
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <Button type="submit" fullWidth>
                                ثبت آزمون
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </form>
        </>
    );
};

export default Exam;
