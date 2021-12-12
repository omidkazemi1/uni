import { Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const ClassCard = ({ classDoc, handleEditClass, handleRemoveClass }) => {
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
                        <Button
                            component={Link}
                            to={`/user/classes/students/${classDoc._id}`}
                            size="small">
                            لیست دانش آموزان
                        </Button>
                        <Button
                            onClick={() => handleRemoveClass(classDoc._id)}
                            size="small"
                            color="error">
                            حذف
                        </Button>
                    </Box>

                    <Box>
                        <Chip
                            clickable
                            onClick={() => handleEditClass(classDoc._id)}
                            label="ویرایش"
                            color="warning"
                            variant="outlined"
                        />
                    </Box>
                </Stack>
            </Card>
        </Grid>
    );
};

export default ClassCard;
