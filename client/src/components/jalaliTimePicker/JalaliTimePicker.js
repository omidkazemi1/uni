import React from "react";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterJalali from "@date-io/date-fns-jalali";
import useMediaQuery from "@mui/material/useMediaQuery";

const JalaliTimePicker = ({ value, setValue, ...rest }) => {
    const isMoblieMediaQuery = useMediaQuery("(max-width:600px)");

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterJalali}>
                {isMoblieMediaQuery ? (
                    <MobileTimePicker
                        cancelText="لغو"
                        okText="تأیید"
                        ampmInClock={false}
                        ampm={false}
                        minDateTime={Date.now()}
                        mask="____/__/__"
                        value={value}
                        onChange={setValue}
                        showTodayButton={true}
                        todayText="امروز"
                        showToolbar={false}
                        renderInput={params => {
                            return <TextField {...params} {...rest} />;
                        }}
                    />
                ) : (
                    <DesktopTimePicker
                        ampmInClock={false}
                        ampm={false}
                        minDateTime={Date.now()}
                        mask="____/__/__"
                        value={value}
                        onChange={setValue}
                        showTodayButton={true}
                        todayText="امروز"
                        renderInput={params => {
                            return <TextField {...params} {...rest} />;
                        }}
                    />
                )}
            </LocalizationProvider>
        </>
    );
};

export default JalaliTimePicker;
