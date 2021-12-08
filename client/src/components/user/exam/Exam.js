import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Exam = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    my={4}
                    sx={{ display: "flex", alignItems: "center" }}>
                    لیست آزمون
                    {/* {loading && <CircularProgress size={25} sx={{ mx: 1 }} />} */}
                </Typography>

                <Button component={Link} to="/user/exam/add" variant="outlined" startIcon={<FaPlus />}>
                    افزودن آزمون
                </Button>
            </Stack>
        </>
    );
};

export default Exam;
