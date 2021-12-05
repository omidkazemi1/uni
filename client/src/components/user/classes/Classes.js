import {
    Button,
    Card,
    CardContent,
    Chip,
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
import { getClasses, addClasses } from "../../../redux/actions/class";
import { FaPlus } from "react-icons/fa";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Classes = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogFromData, setDialogFromData] = useState({ name: "", grade: "" });
    const [dialogFromError, setDialogFromError] = useState({ name: false, grade: false });
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

        dispatch(addClasses({ ...dialogFromData }));
        handleDialogClose();
    };

    useEffect(() => {
        dispatch(getClasses());
    }, [dispatch]);

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
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
                    <DialogTitle>افزودن کلاس</DialogTitle>
                    <form onSubmit={handleDialogSabmit}>
                        <DialogContent>
                            <TextField
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
                {classDocs.map(classDoc => (
                    <Grid key={classDoc._id} item xs={12} md={6} lg={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between">
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom>
                                        {classDoc.grade}
                                    </Typography>
                                    <Chip label={`${classDoc.students.length} دانش آموز`} />
                                </Stack>

                                <Typography variant="h4" mt={4}>
                                    {classDoc.name}
                                </Typography>
                            </CardContent>

                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                p={2}>
                                <Box>
                                    <Button size="small">لیست دانش آموزان</Button>
                                    <Button size="small" color="error">
                                        حذف
                                    </Button>
                                </Box>

                                <Box>
                                    <Chip
                                        clickable
                                        component={Link}
                                        to="/user/profile"
                                        label="ویرایش"
                                        color="warning"
                                        variant="outlined"
                                    />
                                </Box>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Classes;
