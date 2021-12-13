import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { forwardRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

const ListItemLink = ({ icon, primary, to, className, ...rest }) => {
    const renderLink = useMemo(
        () =>
            forwardRef((itemProps, ref) => (
                <Link to={to} ref={ref} {...itemProps} role={undefined} />
            )),
        [to]
    );

    return (
        <li>
            <ListItem button component={renderLink} className={className} sx={{ my: 1 }}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

export default ListItemLink;
