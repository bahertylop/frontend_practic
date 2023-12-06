import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

import data from "./products.json"


// export const getProduct = createAsyncThunk(
//     'products/getProducts', 
//     async(id, thunkAPI) => {
//         try {
//             const item = data.find(item => item.id === id);
//             return item;
//         } catch(err) {
//             console.log(err);
//             return thunkAPI.rejectWithValue(err);
//         }
//     }
// );

export const getProductById = (id) => {
    const product = data.find((item) => item.id === id);
    return product;
};
