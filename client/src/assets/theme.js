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
    }
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin]
});

export const RTL = props => {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
};
