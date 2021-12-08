import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItem,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import React from "react";

const MultiSelect = ({ selectedValues, values, handler, ...rest }) => {
    return (
        <>
            <FormControl fullWidth margin="normal">
                <InputLabel>کلاس ها</InputLabel>
                <Select
                    {...rest}
                    multiple
                    value={selectedValues}
                    onChange={handler}
                    input={<OutlinedInput label="کلاس ها" />}
                    renderValue={selected => selected.map(value => value.name).join(", ")}>
                    {values.map(classDoc => (
                        <MenuItem key={classDoc._id} value={classDoc}>
                            <Checkbox
                                checked={
                                    selectedValues
                                        .map(value => value._id)
                                        .indexOf(classDoc._id) > -1
                                }
                            />
                            <ListItemText primary={classDoc.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default MultiSelect;
