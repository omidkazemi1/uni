import {
    Button,
    Card,
    CardContent,
    Chip,
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
import { getClasses } from "../../../redux/actions/class";
import { FaPlus } from "react-icons/fa";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Classes = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogFromData, setDialogFromData] = useState({ name: "", grade: "" });
    const [dialogFromError, setDialogFromError] = useState({ name: false, grade: false });

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
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold" my={4}>
                    کلاس های من
                </Typography>

                <Button variant="outlined" onClick={handleDialogOpen} startIcon={<FaPlus />}>
                    افزودن کلاس
                </Button>

                <Dialog open={dialogOpen} maxWidth="lg" onClose={handleDialogClose}>
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
                            <Button>ثبت</Button>
                            <Button color="error" onClick={handleDialogClose}>
                                لغو
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Stack>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={4}>
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
                                    پایه دهم
                                </Typography>
                                <Chip label="۱۴ دانش آموز" />
                            </Stack>

                            <Typography variant="h4">کلاس ریاضی</Typography>
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
                <Grid item xs={12} md={6} lg={4}>
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
                                    پایه دهم
                                </Typography>
                                <Chip label="۱۴ دانش آموز" />
                            </Stack>

                            <Typography variant="h4">کلاس ریاضی</Typography>
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
                <Grid item xs={12} md={6} lg={4}>
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
                                    پایه دهم
                                </Typography>
                                <Chip label="۱۴ دانش آموز" />
                            </Stack>

                            <Typography variant="h4">کلاس ریاضی</Typography>
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
            </Grid>
        </>
    );
};

export default Classes;
