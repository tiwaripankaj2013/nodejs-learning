import { createSlice,createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    value:0,
};

//create action 

export const fetchPost = createAsyncThunk('post/list',async(payload,{rejectWithValue,getState,dispatch})=>{
try {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
} catch (error) {
    return error?.response;
}
});

//slices 
const postSlices = createSlice({
    name:'post',
    initialState:{},
    extraReducers:{
        [fetchPost.pending]:(state,action)=>{
            state.loading = true;

        },
        //handle fulfilled 
        [fetchPost.fulfilled]:(state,action)=>{
            state.postsList = action.payload;
            state.loading =false;
        },
        [fetchPost.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
    }
});
export const counterSlices  = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state,action)=>{
            state.value++;
        },
        decrement:(state,action)=>{
            state.value--;
        },
        increaseByAmount:(state,action) =>{
            state.value += action.payload;
        },
    },
});
export const {increment,decrement,increaseByAmount} = counterSlices.reducer;

//export reducers
export default postSlices.reducer;
