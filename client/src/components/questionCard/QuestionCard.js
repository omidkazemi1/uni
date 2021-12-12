import { Button, Chip, Box, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrEdit } from "react-icons/gr";
import { CgViewList } from "react-icons/cg";
import { motion, usePresence } from "framer-motion";

const QuestionCard = ({ question, index, handleRemove, handleEdit, handlePreview }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isPresent, safeToRemove] = usePresence();

    const transition = { type: "tween", stiffness: 500, damping: 50 };

    const animations = {
        layout: true,
        initial: "out",
        animate: isPresent ? "in" : "out",
        whileTap: "tapped",
        variants: {
            in: { y: 0, opacity: 1 },
            out: { y: 100, opacity: 0, zIndex: -1 }
        },
        onAnimationComplete: () => !isPresent && safeToRemove(),
        transition
    };

    useEffect(() => {
        console.log(isPresent, "present");
    }, [isPresent]);

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = action => action(index, handleCloseMenu());

    return (
        <>
            <Paper
                component={motion.div}
                positionTransition
                {...animations}
                variant="outlined"
                sx={{ my: 3, p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Box>
                        <Chip label={`سوال ${index + 1}`}></Chip>
                        <Typography variant="body2" mt={3}>
                            {question.body}
                        </Typography>
                    </Box>

                    <Box>
                        <Button onClick={handleOpenMenu}>نتظیمات</Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={handleCloseMenu}>
                            <MenuItem onClick={() => handleClickMenuItem(handleRemove)}>
                                <CgTrash style={{ paddingLeft: "12px" }} />
                                حذف
                            </MenuItem>
                            <MenuItem onClick={() => handleClickMenuItem(handleEdit)}>
                                <GrEdit style={{ paddingLeft: "12px" }} />
                                ویرایش
                            </MenuItem>
                            <MenuItem onClick={() => handleClickMenuItem(handlePreview)}>
                                <CgViewList style={{ paddingLeft: "12px" }} />
                                نمایش
                            </MenuItem>
                        </Menu>
                        ‍‍‍‍‍‍‍
                    </Box>
                </Stack>
            </Paper>
        </>
    );
};

export default QuestionCard;
