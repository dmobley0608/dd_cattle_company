import { createSlice } from "@reduxjs/toolkit";



const navbarSlice = createSlice({
    name:"navbar",
    initialState:{showNavbar:false},
    reducers:{
        toggle: state =>{state.showNavbar =  !state.showNavbar}
    }
})

export const {toggle} = navbarSlice.actions
export const selectShowNavbar = (state)=>state.navbar.showNavbar;
export default navbarSlice.reducer;