import { Button, Chip, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { GrEdit } from "react-icons/gr";
import { CgViewList } from "react-icons/cg";

const QuestionCard = ({ question, index }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Paper variant="outlined" sx={{ my: 3, p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Box>
                        <Chip label={`سوال ${++index}`}>
                            
                        </Chip>
                        <Typography variant="body2" mt={3}>{question.body}</Typography>
                    </Box>

                    <Box>
                        <Button onClick={handleOpenMenu}>نتظیمات</Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={handleCloseMenu}>
                            <MenuItem onClick={handleCloseMenu}>
                                <CgTrash />
                                حذف
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu}>
                                <GrEdit />
                                ویرایش
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu}>
                                <CgViewList />
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
