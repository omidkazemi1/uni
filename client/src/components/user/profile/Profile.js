import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
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
            <Typography variant="h3" my={4}>
                پروفایل
            </Typography>

            <form onSubmit={submiteHandler}>
                <Grid container py={3} justifyContent="center" component={Paper}>
                    <Grid item xs={12} sm={9} md={6} lg={4} sx={{ mx: 3 }}>
                        <TextField
                            name="firstName"
                            label="نام"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.firstName}
                            error={formError.firstName}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9} md={6} lg={4} sx={{ mx: 3 }}>
                        <TextField
                            name="lastName"
                            label="نام خانوادگی"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.lastName}
                            error={formError.lastName}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9} md={6} lg={4} sx={{ mx: 3 }}>
                        <TextField
                            name="nationalCode"
                            label="کد ملی"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.nationalCode}
                            error={formError.nationalCode}
                            onChange={inputChangeHandler}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={9} md={6} lg={4} sx={{ mx: 3 }}>
                        <TextField
                            name="phoneNumber"
                            label="شماره موبایل"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={formData.phoneNumber}
                            error={formError.phoneNumber}
                            onChange={inputChangeHandler}
                            disabled
                        />
                    </Grid>

                    <Grid item xs={12} sm={9} md={6} lg={4} sx={{ mx: 3 }} mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={!changing}>
                            ذخیره
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={9} md={6} lg={4} sx={{ mx: 3 }} mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            onClick={cancelButtonHandler}
                            disabled={!changing}>
                            لغو
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default Profile;
