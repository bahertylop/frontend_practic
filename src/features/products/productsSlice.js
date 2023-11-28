import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants";
import axios from 'axios'


export const getProducts = createAsyncThunk(
    'products/getProducts', 
    async(_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/products`);
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


const initialState = {
    list: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState: { 
        list: [],
        // filtered: [],
        // related: [],
        isLoading: false,
     },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export default productsSlice.reducer;