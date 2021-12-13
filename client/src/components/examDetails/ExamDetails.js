import { Box, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "jalali-moment";

const ExamDetails = () => {
    const [exam, setExam] = useState({});
    const [examClasses, setExamClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { examId } = useParams();
    const { exams } = useSelector(state => state.exam);
    const { classDocs } = useSelector(state => state.classes);

    useEffect(() => {
		
    }, [loading, examId, exams]);

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

                <Box my={3}>
                    <Typography variant="body1">نام آزمون</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {exam.name}
                    </Typography>
                </Box>
                <Divider />
                <Box my={3}>
                    <Typography variant="body1">تاریخ شروع</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {moment(exam.startTime)
                            .locale("fa")
                            .format("jD jMMMM jYYYY [ساعت] h:mm a")}
                    </Typography>
                </Box>
                <Divider />
                <Box my={3}>
                    <Typography variant="body1">مدت امتحان</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {exam.duration}
                    </Typography>
                </Box>
                <Divider />
                <Box my={3}>
                    <Typography variant="body1">کلاس ها</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/* {classes.join(", ")} */}
                    </Typography>
                </Box>
                <Divider />
            </Grid>
        </>
    );
};

export default ExamDetails;
