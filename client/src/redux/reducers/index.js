import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";
import classes from "./class";
import student from "./students";
import exam from './exam'
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

const rootReducer = combineReducers({ auth, classes, student, exam });

export default persistReducer(persistConfig, rootReducer);
