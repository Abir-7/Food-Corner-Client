import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"


const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
    },
}


const initialState = {
    menuID:'',
    itemName: '',
    isLoading: true,
    ingredients: '',
    category: '',
    time: [],
    cuisine: '',
    price: [],
    urls: [],

    isMenuError: false,
    menuError: '',

    index: 0,
}



export const getMenu = createAsyncThunk('menuItemSlice/menuItem', async (id) => {
    const res = await axios.get(`http://localhost:4000/getMenu/${id}`, config)
    const data = res.data
    console.log(data.res, res, '[[]]')
    return { id:data._id ,itemName: data.itemName, price: data.price, time: data.time, urls: data.urls, cuisine: data.cuisine, category: data.category, ingredients: data.ingredients }
})

const menuDetailsSlice = createSlice({
    name: 'updateProfile',
    initialState,
    reducers: {
        increment: (state, { payload }) => {
            if (payload.index == payload.length - 1) {
                state.index = 0
            }
            else {
                state.index = state.index + 1
            }
        },
        decrement: (state, { payload }) => {
            if (payload.index == 0) {
                state.index = payload.length - 1
            }
            else {
                state.index = state.index - 1
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMenu.pending, (state) => {
                state.menuID=''
                state.itemName = ''
                state.isLoading = true
                state.ingredients = ''
                state.category = ''
                state.time = []
                state.cuisine = ''
                state.price = []
                state.urls = []


                state.isMenuError = false,
                    state.menuError = ''
            })
            .addCase(getMenu.fulfilled, (state, { payload }) => {
                state.menuID=payload.id
                state.itemName = payload.itemName
                state.isLoading = false
                state.ingredients = payload.ingredients
                state.category = payload.category
                state.time = payload.time
                state.cuisine = payload.cuisine
                state.price = payload.price
                state.urls = payload.urls

                state.isMenuError = false,
                    state.menuError = ''
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.menuID=''
                state.itemName = ''
                state.isLoading = false
                state.ingredients = ''
                state.category = ''
                state.time = []
                state.cuisine = ''
                state.price = []
                state.urls = []

                state.isMenuError = true,
                    state.menuError = action.error.message;
            })

    },

})

export const { increment,decrement } = menuDetailsSlice.actions

export default menuDetailsSlice.reducer