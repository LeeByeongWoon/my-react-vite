import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIncreament = createAsyncThunk("counter/fetchIncreament", async (value: number) => {
    const response = await axios.put("/counter/increament", { value: value });
    return response.data;
});

export const counterSilce = createSlice({
    name: "asd",
    initialState: {
        value: 0,
    },
    reducers: {
        increament: (state) => {
            state.value += 1;
        },
        decreament: (state) => {
            state.value -= 1;
        },
        increamentByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIncreament.fulfilled, (state, action) => {
            state.value = action.payload.value;
        });
    },
});

export const { increament, decreament, increamentByAmount } = counterSilce.actions;

export default counterSilce.reducer;
