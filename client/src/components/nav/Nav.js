import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    AppBar,
    Box,
    Avatar,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { HiOutlineMenu } from "react-icons/hi";
import { MdPerson } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { RiListCheck2 } from "react-icons/ri";
import { IoMdExit } from "react-icons/io";

function Nav() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user } = useSelector(state => state.auth);

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <nav>
            <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                            مکتب چی
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit">
                                <HiOutlineMenu />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" }
                                }}>
                                <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                                    خانه
                                </MenuItem>
                                <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                                    دوره های آموزشی
                                </MenuItem>
                                <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                                    ارتباط با ما
                                </MenuItem>
                            </Menu>
                        </Box>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            مکتب چی
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            <Button
                                component={Link}
                                to="/"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white" }}>
                                خانه
                            </Button>
                            <Button
                                component={Link}
                                to="/"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white" }}>
                                دوره های آموزشی
                            </Button>
                            <Button
                                component={Link}
                                to="/"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white" }}>
                                ارتباط با ما
                            </Button>
                        </Box>

                        {user ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                            {user.firstName.charAt(0)}
                                            {user.lastName.charAt(0)}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}>
                                    <MenuItem
                                        component={Link}
                                        to="/user/profile"
                                        onClick={handleCloseUserMenu}>
                                        <MdPerson size="20px" style={{ paddingLeft: '12px'}} />
                                        پروفایل
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/user/classes"
                                        onClick={handleCloseUserMenu}>
                                        <SiGoogleclassroom size="20px" style={{ paddingLeft: '12px'}} />
                                        کلاس های من
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="/user/exam"
                                        onClick={handleCloseUserMenu}>
                                        <RiListCheck2 size="20px" style={{ paddingLeft: '12px'}} />
                                        آزمون
                                    </MenuItem>
                                    <MenuItem
                                        component={Link}
                                        to="logout"
                                        onClick={handleCloseUserMenu}>
                                        <IoMdExit size="20px" style={{ paddingLeft: '12px'}} />
                                        خروج
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="auth/login/teacher"
                                    variant="outlined"
                                    sx={{ color: "white", marginRight: "1rem" }}>
                                    ورود
                                </Button>
                                <Button
                                    component={Link}
                                    to="auth/register"
                                    variant="contained"
                                    href="auth/register"
                                    color="secondary"
                                    sx={{ color: "white" }}>
                                    ثبت نام
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </nav>
    );
}

export default Nav;
