import { Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import moment from "jalali-moment";
import { motion } from "framer-motion";

const ExamCard = ({ exam, handleRemoveExam, role }) => {
    const isTeacher = Boolean(role === "teacher");

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
                    <Box>
                        {moment(exam.startTime).isSameOrBefore() ? (
                            <Button
                                component={Link}
                                to={`/user/exam/${exam.id}`}
                                size="small">
                                شروع آزمون
                            </Button>
                        ) : (
                            <Button disabled size="small">
                                هنوز شروع نشده
                            </Button>
                        )}
                    </Box>
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

                {/* <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}>
                    <Box>
                        {isTeacher && (
                            <Button
                                component={Link}
                                to={`/user/exam/details/${exam._id}`}
                                size="small">
                                جزئیات
                            </Button>
                        )}

                        {moment(exam.startTime).isBefore() ? (
                            <Button
                                component={Link}
                                to={`/user/exam/${exam._id}`}
                                size="small">
                                شروع آزمون
                            </Button>
                        ) : (
                            <Button disabled size="small">
                                هنوز شروع نشده
                            </Button>
                        )}
                    </Box>

                    {isTeacher && (
                        <Box>
                            <Button
                                onClick={() => handleRemoveExam(exam._id)}
                                size="small"
                                color="error">
                                حذف
                            </Button>
                        </Box>
                    )}
                </Stack> */}
            </Card>
        </Grid>
    );
};

export default ExamCard;
