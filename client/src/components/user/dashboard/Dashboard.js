import React from "react";
import { Outlet } from "react-router-dom";
import { Drawer, List, Box, Toolbar, Grid } from "@mui/material";

import { MdPerson } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { RiListCheck2 } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";

import ListItemLink from "../../listItemLink/ListItemLink";

const Dashboard = props => {
    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: 240,
                                boxSizing: "border-box"
                            }
                        }}>
                        <Toolbar />
                        <Box sx={{ overflow: "auto" }}>
                            <List>
                                <ListItemLink
                                    to="/user/profile"
                                    primary="پروفایل"
                                    icon={<MdPerson size="35px" />}
                                />
                                <ListItemLink
                                    to="/user/classes"
                                    primary="کلاس های من"
                                    icon={<SiGoogleclassroom size="35px" />}
                                />
                                <ListItemLink
                                    to="/user/exam"
                                    primary="آزمون"
                                    icon={<RiListCheck2 size="35px" />}
                                />
                                <ListItemLink
                                    to="/user/notification"
                                    primary="اعلانانت"
                                    icon={<MdNotifications size="35px" />}
                                />
                            </List>
                        </Box>
                    </Drawer>
                </Grid>
                <Grid item>
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <Toolbar />
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
