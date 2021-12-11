import React from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterJalali from "@date-io/date-fns-jalali";

const JalaliDateTimePicker = ({ value, setValue, ...rest }) => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterJalali}>
                <DateTimePicker
                    mask="____/__/__"
                    value={value}
                    onChange={setValue}
                    renderInput={params => {
                        return <TextField {...params} {...rest} />;
                    }}
                />
            </LocalizationProvider>
        </>
    );
};

export default JalaliDateTimePicker;
