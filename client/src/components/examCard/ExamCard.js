import { Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import moment from "jalali-moment";
import { motion } from "framer-motion";

const ExamCard = ({ exam, handleRemoveExam, role }) => {
    const isTeacher = Boolean(role === "teacher");

    const checkTime = () => {
        const now = moment(Date.now());
        const endTime = moment(exam.startTime).add(exam.duration, "minutes");
        const startTime = moment(exam.startTime);
        const isBetween = now.isBetween(startTime, endTime);
        if (isBetween) {
            return (
                <Button component={Link} to={`/user/exam/${exam.id}`} size="small">
                    شروع آزمون
                </Button>
            );
        } else if (!isBetween && now.isSameOrAfter()) {
            return (
                <Button component={Link} to={`/user/exam/${exam.id}`} size="small">
                    نتیجه آزمون
                </Button>
            );
        } else if (!isBetween && now.isSameOrBefore()) {
            <Button component={Link} to={`/user/exam/${exam.id}`} size="small">
                آزمون هنوز شروع نشده
            </Button>;
        }
    };

    const acions = () => {
        if (isTeacher) {
            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}>
                    <Box>
                        <Button
                            component={Link}
                            to={`/user/exam/details/${exam._id}`}
                            size="small">
                            جزئیات
                        </Button>
                    </Box>

                    <Box>
                        <Button
                            onClick={() => handleRemoveExam(exam._id)}
                            size="small"
                            color="error">
                            حذف
                        </Button>
                    </Box>
                </Stack>
            );
        } else {
            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}>
                    <Box>{checkTime()}</Box>
                </Stack>
            );
        }
    };

    return (
        <Grid
            component={motion.div}
            layout
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            item
            xs={12}
            md={6}
            lg={4}>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {moment(exam.startTime)
                                .locale("fa")
                                .format("jD jMMMM jYYYY [ساعت] h:mm a")}
                        </Typography>
                        <Chip
                            label={`${
                                isTeacher ? exam.questions.length : exam.questionLength
                            } سوال`}
                        />
                    </Stack>

                    <Typography variant="h4" mt={4}>
                        {exam.name}
                    </Typography>
                </CardContent>

                {acions()}
            </Card>
        </Grid>
    );
};

export default ExamCard;
