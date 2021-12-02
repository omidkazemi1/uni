import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { forwardRef, useMemo } from "react";
import { Link } from "react-router-dom";

const ListItemLink = ({ icon, primary, to }) => {
    const renderLink = useMemo(
        () =>
            forwardRef((itemProps, ref) => (
                <Link to={to} ref={ref} {...itemProps} role={undefined} />
            )),
        [to]
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

export default ListItemLink;
