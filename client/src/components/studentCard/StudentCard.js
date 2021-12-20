import React from "react";
import { Avatar, Button, Divider, Grid, Typography } from "@mui/material";

const StudentCard = ({ student, handleRemoveStudent }) => {
    const stringToColor = string => {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    };

    const stringAvatar = name => {
        return {
            sx: {
                bgcolor: stringToColor(name)
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        };
    };

    return (
        <>
            <Grid item xs={12}>
                <Grid container my={2}>
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}>
                        <Avatar {...stringAvatar(student.fullName)}></Avatar>
                        <Typography vairant="body2" mx={1}>
                            {student.fullName}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}>
                        <Typography variant="body1" sx={{ display: { md: "none" } }}>
                            شماره موبایل
                        </Typography>
                        <Typography
                            variant="body2"
                            color="GrayText"
                            sx={{ m: { xs: 1, md: 0 } }}>
                            {student.phoneNumber}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}>
                        <Typography variant="body1" sx={{ display: { md: "none" } }}>
                            کد ملی
                        </Typography>
                        <Typography
                            variant="body2"
                            color="GrayText"
                            sx={{ m: { xs: 1, md: 0 } }}>
                            {student.nationalCode}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Button onClick={() => handleRemoveStudent(student._id)} color="error">
                            حذف
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
            </Grid>
        </>
    );
};

export default StudentCard;
