import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"





// export const getCategories = createAsyncThunk(
//     'categories/getCategories', 
//     async(_, thunkAPI) => {
//         try {
//             const res = await axios(`${BASE_URL}/categories`);
//             return res.data;
//         } catch(err) {
//             console.log(err);
//             return thunkAPI.rejectWithValue(err);
//         }
//     }
// );

// export const createUser = createAsyncThunk(
//     'categories/getCategories', 
//     async(payload, thunkAPI) => {
//         try {
//             return data;
//         } catch(err) {
//             console.log(err);
//             return thunkAPI.rejectWithValue(err);
//         }
//     }
// );


const userSlice = createSlice({
    name: 'user',

    initialState: {
        currentUser: [],
        cart: [],
        favourites: [],
        isLoading: false 
    },

    reducers: {
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({ id }) => id === payload.id)

            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id ? { ...item, quantity: payload.quantity || item.quantity + 1} : item;
                })
            } else newCart.push({ ...payload, quantity: 1 })
            
            state.cart = newCart;
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id !== payload);
        },
        addItemToFavourites:(state, { payload }) => {
            let newFavourites = [...state.favourites];
            const found = state.favourites.find(({ id }) => id === payload.id);

            if (!found) {
                newFavourites.push({ ...payload });
            }

            state.favourites = newFavourites;
        }, 
        removeItemFromFavourites: (state, { payload }) => {
            state.favourites = state.favourites.filter(({ id }) => id !== payload);
        }



    }

    // extraReducers: (builder) => {
    //     builder.addCase(getCategories.pending, (state) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(getCategories.fulfilled, (state, action) => {
    //         state.list = action.payload;
    //         state.isLoading = flase;
    //     });
    //     builder.addCase(getCategories.rejected, (state) => {
    //         state.isLoading = false;
    //     });
    // },
});

export const { addItemToCart, removeItemFromCart, addItemToFavourites, removeItemFromFavourites } = userSlice.actions;

export default userSlice.reducer;