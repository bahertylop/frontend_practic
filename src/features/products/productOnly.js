import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

import data from "./products.json"
import {ROUTES} from "../../utils/routes";


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
    // const dataLength = Array.isArray(data) ? data.length : Object.keys(data).length;
    // if (id <= 0 || id >= dataLength) {
    //     const navigate = useNavigate();
    //     navigate(ROUTES.HOME);
    //     return;
    // }
    const product = data.find((item) => item.id === id);
    return product;
};
