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

    isFavourite:false,
    isFavouriteLoading:true,
    isFavouriteError:false,
    favouriteError:'',

    favouriteMenuData:[],
    isFavouriteMenuDataLoading:true,
    isFavouriteMenuDataError:false,
    favouriteMenuDataError:'',
} 



export const getMenu = createAsyncThunk('menuItemSlice/menuItem', async (id) => {
    const res = await axios.get(`http://localhost:4000/getMenu/${id}`, config)
    const data = res.data
   // console.log(data.res, res, '[[]]')
    return { id:data._id ,itemName: data.itemName, price: data.price, time: data.time, urls: data.urls, cuisine: data.cuisine, category: data.category, ingredients: data.ingredients }
})

export const getFavMenu = createAsyncThunk('menuItemSlice/FavMenuItem', async (id) => {
    const res = await axios.get(`http://localhost:4000/favMenu/${id}`, config)
    const data = res.data
    console.log(data, res, '[[---]]')
    return  data.result
})

export const getFavMenuData = createAsyncThunk('menuItemSlice/FavMenuItemData', async (email) => {
    const res = await axios.get(`http://localhost:4000/favMenuData/${email}`, config)
    const data = res.data
    console.log(data, res, '[[---]]')
    return  data
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
            .addCase(getFavMenu.pending, (state) => {
                state.isFavourite=false
                state.isFavouriteLoading=true
                state.isFavouriteError=false
                state.favouriteError=''
            })
            .addCase(getFavMenu.fulfilled, (state, { payload }) => {
                state.isFavourite=payload
                state.isFavouriteLoading=false
                state.isFavouriteError=false
                state.favouriteError=''
            })
            .addCase(getFavMenu.rejected, (state, action) => {
                state.isFavourite=false
                state.isFavouriteLoading=false
                state.isFavouriteError=true
                state.favouriteError=action.error.message
            })
            .addCase(getFavMenuData.pending, (state) => {
                state.favouriteMenuData=state.favouriteMenuData
                state.isFavouriteMenuDataLoading=true
                state.isFavouriteMenuDataError=false
                state.favouriteMenuDataError=''
            })
            .addCase(getFavMenuData.fulfilled, (state, { payload }) => {
                state.favouriteMenuData=payload
                state.isFavouriteMenuDataLoading=false
                state.isFavouriteMenuDataError=false
                state.favouriteMenuDataError=''
            })
            .addCase(getFavMenuData.rejected, (state, action) => {
                state.favouriteMenuData=[]
                state.isFavouriteMenuDataLoading=false
                state.isFavouriteMenuDataError=true
                state.favouriteMenuDataError=action.error.message
            })

    },

})

export const { increment,decrement } = menuDetailsSlice.actions

export default menuDetailsSlice.reducer