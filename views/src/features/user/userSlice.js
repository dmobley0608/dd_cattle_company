import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emailLogin } from "./userApi";


//Login
export const login = createAsyncThunk('login', 
async (user)=>{    
    const {data} = await emailLogin(user.email, user.password);       
    return data;
})

//UserSlice
export const userSlice=createSlice({
    name:'user',
    initialState:{
        email:null, 
        role:null,
    isLoading: false,
    hasError: false,
    },
    reducers:{ 
        logout:(state)=>{state.email=null; state.role=null}
     },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending, (state)=>{state.isLoading=true; state.hasError=false})
        .addCase(login.fulfilled, (state, {payload})=>{state.email=payload.email; state.role=payload.role; state.token=payload.token; state.isLoading=false})
        .addCase(login.rejected, (state)=>{state.isLoading=false; state.hasError=true;})
    }
})
//Actions
export const {logout} = userSlice.actions
//Selectors
export const selectUser = (state) => state.user
export const selectLoadingUser = state => state.user.isLoading


export default userSlice.reducer
