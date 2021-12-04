import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";

// import { customTheme } from "./assets/theme";
// import { ThemeProvider, StylesProvider, jssPreset } from "@mui/styles";
// import { create } from "jss";
// import rtl from "jss-rtl";
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
