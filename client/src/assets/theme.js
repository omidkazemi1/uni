import { createTheme } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export const customTheme = createTheme({
    direction: "rtl",
    typography: {
        fontFamily: "iranyekan"
    },
    shape: {
        borderRadius: 8
    },
    palette: {
        primary: {
            main: "#4b7ba8",
            light: "#A5BDD3",
            dark: "#2D4964"
        },
        secondary: {
            main: "#f4ba11",
            light: "#F7CE58",
            dark: "#C3940D"
        }
    }
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin]
});

export const RTL = props => {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
};
