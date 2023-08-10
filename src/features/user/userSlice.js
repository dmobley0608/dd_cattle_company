import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUserSession, emailLogin, userLogout } from "./userApi";


//Login
export const login = createAsyncThunk('login',
    async (user) => {
        const { data } = await emailLogin(user.username, user.password);

        return data;
    })
// Check For Existing Session
export const checkSession = createAsyncThunk('checkSession',
    async () => {
        const { data } = await checkUserSession();

        return data;
    })
//Logout
export const logoutUser = createAsyncThunk('logout',
    async () => {
        console.log("loggin out")
        const { data } = null;
        return data;
    })
//UserSlice
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        role: null,
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.isLoading = true; state.hasError = false })
            .addCase(login.fulfilled, (state, { payload }) => { state.username = payload.username; state.role = payload.role; state.isLoading = false })
            .addCase(login.rejected, (state) => { state.isLoading = false; state.hasError = true; })

            .addCase(checkSession.pending, (state) => { state.isLoading = true; state.hasError = false })
            .addCase(checkSession.fulfilled, (state, { payload }) => { state.username = payload.username; state.role = payload.role; state.isLoading = false })
            .addCase(checkSession.rejected, (state) => { state.isLoading = false; state.hasError = true; })

            .addCase(logoutUser.pending, (state) => { state.isLoading = true; state.hasError = false })
            .addCase(logoutUser.fulfilled, (state, { payload }) => { state.username = null; state.role = null; state.isLoading = false })
            .addCase(logoutUser.rejected, (state) => { state.isLoading = false; state.hasError = true; })
    }
})

//Selectors
export const selectUser = (state) => state.user
export const selectLoadingUser = state => state.user.isLoading


export default userSlice.reducer
