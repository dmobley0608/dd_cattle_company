import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHorses, getMedicalRecordsByHorseId as ghmr, getHorseById as ghbid, getHorseByName as ghbn } from "./horsesAPI";




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
    if(!id) return {}
    const horse = await ghbid(id)
    return horse.data;
})

export const getHorseByName = createAsyncThunk("getHorseByName",
async(name)=>{
    const result = await ghbn(name)  
    const horse = result.data
    if(horse.brand){
        let zeros = 8-horse.brand.length
        let brand = ''      
        for(let i = zeros; i > 0; i--){
            brand += '0'
        }
        horse.brand = brand + horse.brand
    }
    return horse
}
)
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
    reducers: {
        clearHorse: (state)=>{state.horse = {}}
        },
    extraReducers: (builder) => {
        builder
            .addCase(loadHorses.pending, (state) => { state.isLoading = true })
            .addCase(loadHorses.fulfilled, (state, { payload }) => {               
                state.horses = {};
                payload.forEach(horse => { state.horses[horse.name] = { ...horse} })
                state.isLoading = false; 
             })
             .addCase(loadHorses.rejected, (state=>{state.hasError = true}))

            .addCase(getHorseById.pending,(state)=>{state.isLoading = true})
            .addCase(getHorseById.fulfilled, (state, {payload})=>{state.horse = payload})

            .addCase(getHorseByName.pending,(state)=>{state.isLoading = true})
            .addCase(getHorseByName.fulfilled, (state, {payload})=>{state.horse = payload; state.isLoading = false})

            .addCase(getHorseMedicalRecordsById.pending, (state) => { state.hasError = false })
            .addCase(getHorseMedicalRecordsById.fulfilled, (state, { payload }) => { state.horses[payload[0].name].records = [...payload] })
    }
})

//Actions
export const {clearHorse} = horsesSlice.actions

//Selectors
export const selectAllHorses = (state) => state.horses.horses
export const selectHorse = (state)=>state.horses.horse
export const selectIsLoading = (state) => state.horses.isLoading


export default horsesSlice.reducer
