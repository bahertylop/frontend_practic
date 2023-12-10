import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants";
import axios from 'axios'

import data from "./products.json"
import { shuffle } from "../../utils/common";


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

const products = data;

export function searchProducts(searchText) {
    searchText = searchText.toLowerCase(); // Преобразуем текст поиска в нижний регистр для удобства сравнения
  
    const results = products.filter(product => {
      const title = product.title.toLowerCase();
      const description = product.description.toLowerCase();
  
      return title.includes(searchText) || description.includes(searchText);
    });
  
    return results;
  }

export function filterById(targetId) {
    return products.filter(item => item.category.id.toString() === targetId.id);
};


const productsSlice = createSlice({
    name: "products",
    initialState: { 
        list: [],
        filtered: [],
        related: [],
        isLoading: false,
    },

    reducers: {
        filterByPrice: (state, { payload }) => {
            state.filtered = state.list.filter(({ price }) => price < payload); 
        },
        getRelatedProducts: (state, { payload }) => {
            const list = state.list.filter(({ category: { id } }) => id === payload);
            state.related = shuffle(list);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.list = payload;
        });
    },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;