import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getClasses,
    addClasses,
    editClasses,
    removeClasses
} from "../../../redux/actions/class";
import { FaPlus } from "react-icons/fa";
import ClassCard from "../../classCard/ClassCard";
import { AnimatePresence, motion } from "framer-motion";

const Classes = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogFromData, setDialogFromData] = useState({ name: "", grade: "" });
    const [dialogFromError, setDialogFromError] = useState({ name: false, grade: false });
    const [selectedClass, setSelectedClass] = useState(null);
    const dispatch = useDispatch();
    const { classDocs, loading } = useSelector(state => state.classes);

    const inputChangeHandler = event => {
        setDialogFromData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setDialogFromError(prevState => ({ ...prevState, [event.target.name]: false }));
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedClass(null);
        setDialogFromData({ name: "", grade: "" });
    };

    const handleDialogSabmit = event => {
        event.preventDefault();
        setDialogFromError({ name: false, grade: false });

        if (!dialogFromData.name.trim()) {
            setDialogFromError(prevState => ({ ...prevState, name: true }));
        }

        if (!dialogFromData.grade.trim()) {
            setDialogFromError(prevState => ({ ...prevState, grade: true }));
        }

        if (selectedClass) {
            dispatch(editClasses(dialogFromData, selectedClass));
        } else {
            dispatch(addClasses({ ...dialogFromData }));
        }
        handleDialogClose();
        setDialogFromData({ name: "", grade: "" });
    };

    const handleEditClass = classId => {
        setSelectedClass(classId);
        const selectedClassDoc = classDocs.find(classDoc => classDoc._id === classId);
        setDialogFromData({ name: selectedClassDoc.name, grade: selectedClassDoc.grade });
        handleDialogOpen();
    };

    const handleRemoveClass = classId => {
        dispatch(removeClasses(classId));
    };

    useEffect(() => {
        dispatch(getClasses());
    }, [dispatch]);

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
                    کلاس های من
                    {loading && <CircularProgress size={25} sx={{ mx: 1 }} />}
                </Typography>

                <Button variant="outlined" onClick={handleDialogOpen} startIcon={<FaPlus />}>
                    افزودن کلاس
                </Button>

                <Dialog open={dialogOpen} maxWidth="sm" fullWidth onClose={handleDialogClose}>
                    <DialogTitle>{selectedClass ? "ویرایش کلاس" : "افزودن کلاس"}</DialogTitle>
                    <form onSubmit={handleDialogSabmit}>
                        <DialogContent>
                            <TextField
                                size="small"
                                name="name"
                                value={dialogFromData.name}
                                error={dialogFromError.name}
                                onChange={inputChangeHandler}
                                fullWidth
                                label="نام کلاس"
                            />
                            <FormHelperText error={dialogFromError.name}>
                                نام کلاس را وارد کنید
                            </FormHelperText>

                            <TextField
                                size="small"
                                name="grade"
                                value={dialogFromData.grade}
                                error={dialogFromError.grade}
                                onChange={inputChangeHandler}
                                fullWidth
                                label="مقطع"
                                sx={{ mt: 3 }}
                            />
                            <FormHelperText error={dialogFromError.grade}>
                                مقطع کلاس را وارد کنید
                            </FormHelperText>
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit">ثبت</Button>
                            <Button color="error" onClick={handleDialogClose}>
                                لغو
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Stack>

            <Grid container spacing={4}>
                {loading ? null : (
                    <AnimatePresence>
                        {classDocs.map(classDoc => (
                            <ClassCard
                                classDoc={classDoc}
                                key={classDoc._id}
                                handleEditClass={handleEditClass}
                                handleRemoveClass={handleRemoveClass}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </Grid>
        </>
    );
};

export default Classes;
