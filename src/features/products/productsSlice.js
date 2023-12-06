import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants";
import axios from 'axios'

import data from "./products.json"


// export const getProducts = createAsyncThunk(
//     'products/getProducts', 
//     async(_, thunkAPI) => {
//         try {
//             const res = await axios(`${BASE_URL}/products`);
//             return res.data;
//         } catch(err) {
//             console.log(err);
//             return thunkAPI.rejectWithValue(err);
//         }
//     }
// );
export const getProducts = createAsyncThunk(
    'products/getProducts', 
    async(_, thunkAPI) => {
        try {
            //const res = await axios(`${BASE_URL}/products`);
            return data;
        } catch(err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


const productsSlice = createSlice({
    name: "products",
    initialState: { 
        list: [],
        filtered: [],
        // related: [],
        isLoading: false,
    },

    reducers: {
        filterByPrice: (state, { payload }) => {
            state.filtered = state.filter(({ price }) => price < payload); 
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export const { filterByPrice } = productsSlice.actions;

export default productsSlice.reducer;