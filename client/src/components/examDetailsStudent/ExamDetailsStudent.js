import {
    Box,
    CircularProgress,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import * as api from "../../api";

const ExamDetails = () => {
    const [exam, setExam] = useState({});
    const [loading, setLoading] = useState(true);
    const { examId } = useParams();
    const { exams } = useSelector(state => state.exam);

    useEffect(() => {}, [loading]);

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

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold" my={4}>
                    جزئیات آزمون
                    {loading && <CircularProgress size={25} sx={{ mx: 1 }} />}
                </Typography>

                <IconButton component={Link} to="/user/exam">
                    <IoIosArrowBack />
                </IconButton>
            </Stack>

            {!loading && (
                <Grid
                    container
                    justifyContent="center"
                    rowSpacing={2}
                    component={Paper}
                    py={3}
                    px={3}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="baseline">
                            <Typography variant="body1" noWrap>
                                نام آزمون:
                            </Typography>
                            <Typography variant="body2" mx={1} noWrap>
                                {exam.exam.name}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        display="flex"
                        justifyContent={{ xs: "flex-start", md: "flex-end" }}>
                        <Box display="flex" alignItems="baseline">
                            <Typography variant="body1" noWrap>
                                نمره:
                            </Typography>
                            <Typography variant="body2" mx={1} noWrap>
                                {exam.score} از {exam.exam.score}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {exam.answers.map((answer, index) => (
                        <Grid item xs={12} md={12} key={index}>
                            <FormLabel>{`سوال ${index + 1}`}</FormLabel>
                            <Typography variant="body1" mb={3}>
                                {answer.body}
                            </Typography>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">پاسخ ها</FormLabel>

                                <Typography variant="body2" my={1}>
                                    گزینه یک:‌ {answer.answer1}
                                </Typography>
                                <Typography variant="body2" my={1}>
                                    گزینه دو:‌ {answer.answer2}
                                </Typography>
                                <Typography variant="body2" my={1}>
                                    گزینه سه:‌ {answer.answer3}
                                </Typography>
                                <Typography variant="body2" my={1}>
                                    گزینه چهار:‌ {answer.answer4}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    پاسخ شما
                                </Typography>
                                <Typography variant="body2" mt={1} mb={3}>
                                    {answer.selectedOption}
                                </Typography>
                            </FormControl>
                            {index !== exam.answers.length - 1 && <Divider />}
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default ExamDetails;
