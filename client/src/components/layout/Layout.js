import { Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import Nav from "../nav/Nav";

const Layout = () => {
    return (
        <>
            <Nav />

            <Toolbar />
            <Outlet />
        </>
    );
};

export default Layout;
