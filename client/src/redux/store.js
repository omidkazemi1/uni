import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

export const store = createStore(reducers, compose(applyMiddleware(thunk, logger)));
export const persistor = persistStore(store);
