import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    sun: {
        position: "absolute",
        top: "90px",
        right: "45%",
        zIndex: -10,
        width: 250,
        height: "auto"
    },
    cloud: {
        position: "absolute",
        top: "85px",
        right: "40%",
        zIndex: -13,
        width: 200,
        height: "auto"
    },
    sharper: {
        position: "absolute",
        top: "120px",
        right: "10%",
        zIndex: -13,
        width: 80,
        height: "auto"
    },
    stapler: {
        position: "absolute",
        bottom: "50px",
        right: "60%",
        zIndex: -13,
        width: 80,
        height: "auto"
    },
    marker: {
        position: "absolute",
        bottom: "30px",
        right: "30%",
        zIndex: -13,
        width: 120,
        height: "auto"
    }
}));

export default useStyles;
