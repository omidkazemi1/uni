import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import moment from "jalali-moment";
import * as api from "../../api";

const ExamDetails = () => {
    const [examLog, setExamLog] = useState([]);
    const [exam, setExam] = useState({});
    const [loading, setLoading] = useState(true);
    const { examId } = useParams();

    useEffect(() => {
        const getExam = async () => {
            try {
                setLoading(true);
                const {
                    data: { exam, examLogs }
                } = await api.getExamTeacherGet(examId);

                console.log(examLogs);

                setExam({ ...exam });
                setExamLog([...examLogs]);
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
                <Grid container rowSpacing={2} component={Paper} py={3} px={3}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="baseline">
                            <Typography variant="body1" noWrap>
                                نام آزمون:
                            </Typography>
                            <Typography variant="body2" mx={1} noWrap>
                                {exam.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
                        <Box display="flex" alignItems="baseline">
                            <Typography variant="body1" noWrap>
                                تاریخ آزمون:
                            </Typography>
                            <Typography variant="body2" mx={1} noWrap>
                                {moment(exam.startTime)
                                    .locale("fa")
                                    .format("jD jMMMM jYYYY [ساعت] h:mm a")}{" "}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="fullWidth" sx={{ my: 3 }} />
                        <Typography variant="h6">لیست دانش آموزان</Typography>
                    </Grid>
                    {examLog.map((classLog, index) => (
                        <>
                            <Grid item xs={12} mb={2}>
                                کلاس: {classLog.className}
                            </Grid>
                            {classLog.students.map((student, index) => (
                                <Grid
                                    component={Paper}
                                    variant="outlined"
                                    py={2}
                                    px={3}
                                    item
                                    xs={12}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center">
                                    <Box>
                                        <Typography variant="body2">
                                            {student.studentName}
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center">
                                        <Typography variant="body2">
                                            نمره:‌ {student.score}
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to={`/user/exam/details/student/${examId}/${student.studentId}/teacher`}>
                                            جزئیات
                                        </Button>
                                    </Box>
                                </Grid>
                            ))}
                            {index !== examLog.length && <Divider />}
                        </>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default ExamDetails;
