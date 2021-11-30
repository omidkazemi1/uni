import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    AppBar,
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
import { Box } from "@mui/system";
import { HiOutlineMenu } from "react-icons/hi";

function Nav() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, error } = useSelector(state => state.auth);

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
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                        Maktab Chi
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
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link to="/">Home</Link>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        Maktab Chi
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}>
                            Home
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
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="user/profile">Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link to="logout">Logout</Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            <Link to="auth/login">
                                <Button variant="text" sx={{ color: "white" }}>
                                    Login
                                </Button>
                            </Link>
                            <Link to="auth/register">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ color: "white" }}>
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Nav;
