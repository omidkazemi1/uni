import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";

const Exam = () => {
    const { examId } = useParams();
    const [exam, setExam] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getExam = async () => {
            try {
                setLoading(true);
                const {
                    data: {
                        data: { exam }
                    }
                } = await api.getExamGet(examId);
                setExam({ ...exam });
                setLoading(false);
            } catch (error) {
                console.log(error, error.response);
            }
        };

        getExam();
    }, [examId]);

    useEffect(() => {
        console.log(exam);
    }, [exam]);

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
                    پروفایل
                </Typography>

                {loading && <CircularProgress size={25} sx={{ mx: 1 }} />}
            </Stack>

            <form>
                {!loading && (
                    <Grid container py={3} justifyContent="center" component={Paper} px={3}>
                        {exam.questions.map((question, index) => (
                            <Grid key={index} item xs={12}>
                                <FormLabel>{`سوال ${index + 1}`}</FormLabel>
                                <Typography variant="body1" mb={2}>{question.body}</Typography>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">پاسخ ها</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="controlled-radio-buttons-group">
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
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <Button fullWidth>ثبت آزمون</Button>
                        </Grid>
                    </Grid>
                )}
            </form>
        </>
    );
};

export default Exam;
