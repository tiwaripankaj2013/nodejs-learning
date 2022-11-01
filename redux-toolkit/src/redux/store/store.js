import { configureStore } from "@reduxjs/toolkit";
import {counterReducer} from '../slices/counterSlices';
import postReducer from '../slices/counterSlices';
const store  = configureStore({
    reducer:{
        post:postReducer,
    }
});

export default store;