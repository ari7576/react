import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import loggerMiddleware from "../lib/loggerMiddleware";
import {thunk} from "redux-thunk";

const store = configureStore({
    reducer: {
        counter: counterReducer, // combineReducers 자동 처리됨
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
});

export default store;