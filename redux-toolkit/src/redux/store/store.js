import { configureStore } from "@reduxjs/toolkit";
import {counterReducer} from '../slices/counterSlices';
import postReducer from '../slices/counterSlices';
import usersReducer from '../slices/users/usersSlice';
const store  = configureStore({
    reducer:{
        post:postReducer,
        users:usersReducer,
    }
});

export default store;