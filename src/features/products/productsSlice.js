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
    console.log(targetId);
    console.log(products[0].category.id);
    return products.filter(item => item.category.id.toString() === targetId);
}

export function getFilteredProduct(values, categoryId) {
    if (!values.price_min) {
        values.price_min = 0;
    }
    if (!values.price_max) {
        values.price_max = 1000;
    }

    if (!values.title) {
        values.title = " ";
    }

    return products.filter(product => {
        const categoryIdMatch = categoryId ? product.category.id.toString() === categoryId : true;
        const titleMatch = product.title.toLowerCase().includes(values.title.toLowerCase());
        const priceMatch = product.price >= values.price_min && product.price <= values.price_max;

        return categoryIdMatch && titleMatch && priceMatch;
    });
}
// export const selectProductsByCategoryId = (state, categoryId) => {
//     return state.products.list.filter(product => product.category.id.toString() === categoryId);
//   };

// productsSlice.js
export const selectProductsByCategoryId = (state, categoryId, title, price_min, price_max) => {
    //const { title, price_min, price_max } = state.products.filters; // Предполагается, что filters - это объект с вашими параметрами
  
    return state.products.list.filter(product => {
      const categoryIdMatch = product.category.id.toString() === categoryId;
      const titleMatch = product.title.toLowerCase().includes(title.toLowerCase());
      const priceMatch = product.price >= price_min && product.price <= price_max;
  
      return categoryIdMatch && titleMatch && priceMatch;
    });
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