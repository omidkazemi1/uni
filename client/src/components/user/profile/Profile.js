import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacher } from "../../../redux/actions/auth";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [changing, setChanging] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        nationalCode: user.nationalCode,
        phoneNumber: user.phoneNumber
    });

    const [formError, setFormError] = useState({
        firstName: false,
        lastName: false,
        nationalCode: false,
        phoneNumber: false
    });

    const inputChangeHandler = event => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        setFormError(prevState => ({ ...prevState, [event.target.name]: false }));
    };

    const cancelButtonHandler = event => {
        setFormData({ ...user });
    };

    const submiteHandler = event => {
        event.preventDefault();
        dispatch(
            updateTeacher({ firstName: formData.firstName, lastName: formData.lastName })
        );
    };

    useEffect(() => {
        if (formData.firstName !== user.firstName || formData.lastName !== user.lastName) {
            setChanging(() => true);
        } else {
            setChanging(() => false);
        }
    }, [formData, changing, user]);

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                    component={motion.h5}
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    variant="h5"
                    fontWeight="bold"
                    my={4}>
                    پروفایل
                </Typography>
            </Stack>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={submiteHandler}>
                <Paper
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 5,
                        px: { xs: 3, md: 0 }
                    }}>
                    <Grid
                        container
                        justifyContent="center"
                        rowSpacing={3}
                        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                        maxWidth="md">
                        <Grid item xs={12} sm={9} md={6}>
                            <TextField
                                name="firstName"
                                label="نام"
                                type="text"
                                fullWidth
                                value={formData.firstName}
                                error={formError.firstName}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9} md={6}>
                            <TextField
                                name="lastName"
                                label="نام خانوادگی"
                                type="text"
                                fullWidth
                                value={formData.lastName}
                                error={formError.lastName}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9} md={6}>
                            <TextField
                                name="nationalCode"
                                label="کد ملی"
                                type="text"
                                fullWidth
                                value={formData.nationalCode}
                                error={formError.nationalCode}
                                onChange={inputChangeHandler}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={9} md={6}>
                            <TextField
                                name="phoneNumber"
                                label="شماره موبایل"
                                type="text"
                                fullWidth
                                value={formData.phoneNumber}
                                error={formError.phoneNumber}
                                onChange={inputChangeHandler}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} sm={9} md={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled={!changing}>
                                ذخیره
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={9} md={6}>
                            <Button
                                variant="contained"
                                color="error"
                                type="submit"
                                fullWidth
                                onClick={cancelButtonHandler}
                                disabled={!changing}>
                                لغو
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </motion.form>
        </>
    );
};

export default Profile;
