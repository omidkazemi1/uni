import React from "react";
import { Outlet } from "react-router-dom";
import {
    Drawer,
    List,
    Box,
    Toolbar,
    Grid,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Divider
} from "@mui/material";
import { MdPerson } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { RiListCheck2 } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import ListItemLink from "../../listItemLink/ListItemLink";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Dashboard = props => {
    const { user } = useSelector(state => state.auth);
    const classes = useStyles();

    return (
        <>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        sx={{
                            width: 260,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: 260,
                                boxSizing: "border-box"
                            }
                        }}>
                        <Toolbar />
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="stretch"
                            spacing={0}
                            height="100%"
                            sx={{ overflow: "auto", px: 4, pt: 2 }}>
                            <Box>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>LG</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="مکتب چی"
                                            secondary="داشبرد معلم"
                                        />
                                    </ListItem>
                                </List>

                                <Divider variant="fullWidth" />

                                <List>
                                    <ListItemLink
                                        to="/user/profile"
                                        primary="پروفایل"
                                        icon={<MdPerson size="35px" />}
                                        className={classes.listItem}
                                    />
                                    <ListItemLink
                                        to="/user/classes"
                                        primary="کلاس های من"
                                        icon={<SiGoogleclassroom size="35px" />}
                                        className={classes.listItem}
                                    />
                                    <ListItemLink
                                        to="/user/exam"
                                        primary="آزمون"
                                        icon={<RiListCheck2 size="35px" />}
                                        className={classes.listItem}
                                    />
                                    <ListItemLink
                                        to="/user/notification"
                                        primary="اعلانانت"
                                        icon={<MdNotifications size="35px" />}
                                        className={classes.listItem}
                                    />
                                </List>
                            </Box>

                            <List>
                                <ListItem className={classes.userCard}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MdPerson />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.fullName} secondary="معلم" />
                                </ListItem>
                            </List>
                        </Stack>
                    </Drawer>
                </Grid>
                <Grid item xs={9.5}>
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
