import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants";


export const getCategories = createAsyncThunk(
    'categories/getCategories', 
    async(_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/categories`);
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

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: { initialState },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export default categoriesSlice.reducer;