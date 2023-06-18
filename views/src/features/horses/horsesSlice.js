import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHorseImages, getHorses, getMedicalRecordsByHorseId as ghmr } from "./horsesAPI";




//Thunks
//Get All Horses
export const loadHorses = createAsyncThunk("allHorses/getAllHorses",
    async (_, { dispatch }) => {
        const { data } = await getHorses();
        const horses = data.map(horse => ({ ...horse, images: [] }))
        return horses
    })


//Get Horse Images By Name
export const getHorseImagesByName = createAsyncThunk("horses/getHorsesImages",
    async (name) => {
        const res = await getHorseImages(name)
        const images = {images: [...res.data.resources], name: name }
        
        return images
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
        imageLoading: true,
        imageError: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadHorses.pending, (state) => { state.isLoading = true })
            .addCase(loadHorses.fulfilled, (state, { payload }) => { state.isLoading = false; payload.forEach(horse => { state.horses[horse.name] = { ...horse, records:[] } }) })

            .addCase(getHorseImagesByName.pending, (state) => { state.imageLoading = true; state.hasError = false })
            .addCase(getHorseImagesByName.rejected, (state) => { state.imageLoading =false; state.hasError = true })
            .addCase(getHorseImagesByName.fulfilled, (state, { payload }) => {state.imageLoading =false; state.horses[payload.name].images = {...payload}; })

            .addCase(getHorseMedicalRecordsById.pending, (state) => { state.hasError = false })
            .addCase(getHorseMedicalRecordsById.fulfilled, (state, { payload }) => { state.horses[payload[0].horse.name].records = [...payload] })
    }
})


//Selectors
export const selectAllHorses = (state) => state.horses.horses
export const selectIsLoading = state => state.horses.isLoading
export const selectImageLoading = state => state.horses.imageLoading

export default horsesSlice.reducer
