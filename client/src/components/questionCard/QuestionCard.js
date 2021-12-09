import { Button, Chip, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrEdit } from "react-icons/gr";
import { CgViewList } from "react-icons/cg";

const QuestionCard = ({ question, index, handleRemove, handleEdit, handlePreview }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickMenuItem = action => action(index, handleCloseMenu())

    return (
        <>
            <Paper variant="outlined" sx={{ my: 3, p: 2 }}>
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
                                <CgTrash style={{ paddingLeft: '12px'}} />
                                حذف
                            </MenuItem>
                            <MenuItem onClick={() => handleClickMenuItem(handleEdit)}>
                                <GrEdit style={{ paddingLeft: '12px'}} />
                                ویرایش
                            </MenuItem>
                            <MenuItem onClick={() => handleClickMenuItem(handlePreview)}>
                                <CgViewList style={{ paddingLeft: '12px'}} />
                                نمایش
                            </MenuItem>
                        </Menu>
                    </Box>
                </Stack>
            </Paper>
        </>
    );
};

export default QuestionCard;
