import { makeStyles } from "@mui/styles";
import { alpha } from '@mui/material/styles';


const useStyle = makeStyles(theme => {
    // console.log(theme);

    return {
        drawer: {
            "& .MuiPaper-root": {
                background: theme.palette.primary.main,
                border: "none"
            }
        },
        listItem: {
            transition: "all 0.3s",
            borderRadius: theme.shape.borderRadius,
            "&:hover": {
                background: theme.palette.primary.light,
                boxShadow: `0 10px 12px ${alpha(theme.palette.primary.light, 0.3)}`
            }
        },
        userCard: {
            background: theme.palette.secondary.main,
            borderRadius: theme.shape.borderRadius,
            "& .MuiListItemText-root": {
                color: theme.palette.common.white,
                "& .MuiListItemText-secondary": {
                    color: theme.palette.common.white,
                    opacity: "0.7"
                }
            }
        }
    };
});

export default useStyle;
