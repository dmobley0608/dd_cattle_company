import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHorses, getMedicalRecordsByHorseId as ghmr, getHorseById as ghbid } from "./horsesAPI";




//Thunks
//Get All Horses
export const loadHorses = createAsyncThunk("allHorses/getAllHorses",
    async (_, { dispatch }) => {
        const { data } = await getHorses();
        const horses = data.map(horse => ({ ...horse}))
        return horses
    })

export const getHorseById = createAsyncThunk("getHorseById", 
async(id)=>{
    if(id === -1) return {}
    const horse = await ghbid(id)
    return horse.data;
})


//Get Horse Records By Name
export const getHorseMedicalRecordsById = createAsyncThunk("horses/getHorseMedicalRecordsById",
    async (id) => {
        const res = await ghmr(id)              
        return res.data;
    })

//Horse Slice
export const horsesSlice = createSlice({
    name: "horses",
    initialState: {
        horses: {},
        horse:{},
        isLoading: true,
        hasError: false,      
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadHorses.pending, (state) => { state.isLoading = true })
            .addCase(loadHorses.fulfilled, (state, { payload }) => { 
                state.isLoading = false; 
                state.horses = {};
                payload.forEach(horse => { state.horses[horse.name] = { ...horse} }) })

            .addCase(getHorseById.pending,(state)=>{state.isLoading = true})
            .addCase(getHorseById.fulfilled, (state, {payload})=>{state.horse = payload})

            .addCase(getHorseMedicalRecordsById.pending, (state) => { state.hasError = false })
            .addCase(getHorseMedicalRecordsById.fulfilled, (state, { payload }) => { state.horses[payload[0].name].records = [...payload] })
    }
})


//Selectors
export const selectAllHorses = (state) => state.horses.horses
export const selectHorse = (state)=>state.horses.horse
export const selectIsLoading = state => state.isLoading


export default horsesSlice.reducer
