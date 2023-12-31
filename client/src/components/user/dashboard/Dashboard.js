import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    Drawer,
    List,
    Box,
    Toolbar,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Divider,
    BottomNavigation,
    BottomNavigationAction
} from "@mui/material";
import { MdPerson } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { RiListCheck2 } from "react-icons/ri";
import ListItemLink from "../../listItemLink/ListItemLink";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { useEffect } from "react/cjs/react.development";

const Dashboard = props => {
    const { user } = useSelector(state => state.auth);
    const classes = useStyles();
    const location = useLocation();

    const [tab, setTab] = useState("");

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        const { pathname } = location;
        const route = pathname.split("/")[2];

        switch (route) {
            case "classes":
                setTab("classes");
                break;
            case "profile":
                setTab("profile");
                break;
            default:
                setTab("exam");
        }
    }, []);

    return (
        <>
            <Box pb={10} sx={{ display: "flex" }}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    sx={{
                        width: 270,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: 270,
                            boxSizing: "border-box"
                        },
                        display: { xs: "none", md: "block" }
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
                                        secondary={`داشبورد ${
                                            user.role === "teacher" ? "معلم" : "دانش آموز"
                                        }`}
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
                            </List>
                        </Box>

                        <List>
                            <ListItem className={classes.userCard}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MdPerson />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.fullName}
                                    secondary={user.role === "teacher" ? "معلم" : "دانش آموز"}
                                />
                            </ListItem>
                        </List>
                    </Stack>
                </Drawer>

                <Box component="main" px={3} sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Box>

            <BottomNavigation
                showLabels
                sx={{
                    position: "fixed",
                    margin: 0,
                    padding: 0,
                    bottom: 0,
                    left: 0,
                    background: theme => theme.palette.secondary.main,
                    width: "100%",
                    display: { xs: "flex", md: "none" }
                }}
                value={tab}
                onChange={handleChange}>
                <BottomNavigationAction
                    component={Link}
                    to="/user/profile"
                    label="پروفایل"
                    value="profile"
                    icon={<MdPerson size="35px" />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/user/classes"
                    label="کلاس های من"
                    value="classes"
                    icon={<SiGoogleclassroom size="35px" />}
                />
                <BottomNavigationAction
                    component={Link}
                    to="/user/exam"
                    label="آزمون"
                    value="exam"
                    icon={<RiListCheck2 size="35px" />}
                />
            </BottomNavigation>
        </>
    );
};

export default Dashboard;
