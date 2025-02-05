import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchForecastByCity = createAsyncThunk(
    "weather/fetchForecastByCity",
    async(city) => {
        const response = await axios.get(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`
        )

        return response.data
    }
)

const weartherSlice = createSlice({
    name:"weather",
    initialState:{
        forecast: {},
        status: "idle",
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchForecastByCity.fulfilled,(state, action) => {
            state.forecast = action.payload
        })
    }
})

export default weartherSlice.reducer;