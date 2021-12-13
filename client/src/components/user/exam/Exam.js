import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExams, removeExam } from "../../../redux/actions/exam";
import { Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import ExamCard from "../../examCard/ExamCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Exam = () => {
    const { exams, loading } = useSelector(state => state.exam);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExams());
    }, [dispatch]);

    const handleRemoveExam = classId => {
        dispatch(removeExam(classId));
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
                    my={4}
                    sx={{ display: "flex", alignItems: "center" }}>
                    لیست آزمون
                    {loading && <CircularProgress size={25} sx={{ mx: 1 }} />}
                </Typography>

                <Button
                    component={Link}
                    to="/user/exam/add"
                    variant="outlined"
                    startIcon={<FaPlus />}>
                    افزودن آزمون
                </Button>
            </Stack>

            <Grid container spacing={4}>
                {loading ? null : (
                    <AnimatePresence>
                        {exams.map(exam => (
                            <ExamCard
                                exam={exam}
                                key={exam._id}
                                handleRemoveExam={handleRemoveExam}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </Grid>
        </>
    );
};

export default Exam;
