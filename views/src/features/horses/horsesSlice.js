import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHorses, getMedicalRecordsByHorseId as ghmr } from "./horsesAPI";




//Thunks
//Get All Horses
export const loadHorses = createAsyncThunk("allHorses/getAllHorses",
    async (_, { dispatch }) => {
        const { data } = await getHorses();
        const horses = data.map(horse => ({ ...horse}))
        return horses
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

           

            .addCase(getHorseMedicalRecordsById.pending, (state) => { state.hasError = false })
            .addCase(getHorseMedicalRecordsById.fulfilled, (state, { payload }) => { state.horses[payload[0].name].records = [...payload] })
    }
})


//Selectors
export const selectAllHorses = (state) => state.horses.horses
export const selectIsLoading = state => state.horses.isLoading


export default horsesSlice.reducer
