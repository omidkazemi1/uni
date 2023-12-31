import React from "react";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterJalali from "@date-io/date-fns-jalali";
import useMediaQuery from "@mui/material/useMediaQuery";

const JalaliDateTimePicker = ({ value, setValue, ...rest }) => {
    const isMoblieMediaQuery = useMediaQuery("(max-width:600px)");

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterJalali}>
                {isMoblieMediaQuery ? (
                    <MobileDateTimePicker
                        cancelText="لغو"
                        okText="تأیید"
                        ampmInClock={false}
                        ampm={true}
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
                    <DesktopDateTimePicker
                        ampmInClock={false}
                        ampm={true}
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

export default JalaliDateTimePicker;
