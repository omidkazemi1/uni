import { Box, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
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

    useEffect(() => {
        console.log(exam);
    }, [loading, examId, exams]);

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
                </Typography>

                <IconButton component={Link} to="/user/exam">
                    <IoIosArrowBack />
                </IconButton>
            </Stack>

            <Grid
                container
                justifyContent="center"
                component={Paper}
                py={3}
                px={{ xs: 3, md: 0 }}>
                <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="baseline">
                        <Typography variant="body1" noWrap>
                            نام آزمون:
                        </Typography>
                        <Typography variant="body2" mx={1} noWrap>
                            {exam.duration} دقیقه
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}></Grid>
            </Grid>
        </>
    );
};

export default ExamDetails;
