import React from "react";
import { Outlet } from "react-router-dom";

import Nav from "../nav/Nav";

const Layout = () => {
    return (
        <>
            <nav>
                <Nav />
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
