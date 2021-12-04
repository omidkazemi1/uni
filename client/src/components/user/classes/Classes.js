import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../../redux/actions/class";
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Classes = () => {
    const dispatch = useDispatch();
    const { classDoc, loading, error } = useSelector(state => state.classes);

    useEffect(() => {}, [dispatch]);

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold" my={4}>
                    کلاس های من
                </Typography>

                <Button variant="outlined" startIcon={<FaPlus />}>
                    افزودن کلاس
                </Button>
            </Stack>

            <Grid container spacing={4}>
                <Grid item xs={4}>
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
                                    icon={<FaPen />}
                                />
                            </Box>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={4}>
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
                                    icon={<FaPen />}
                                />
                            </Box>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={4}>
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
                                    icon={<FaPen />}
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
