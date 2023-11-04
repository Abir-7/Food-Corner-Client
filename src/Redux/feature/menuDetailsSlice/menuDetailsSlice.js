import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"





const initialState = {
    menuID: '',
    itemName: '',
    isLoading: true,
    ingredients: '',
    category: '',
    time: [],
    cuisine: '',
    price: [],
    urls: [],
    averageRating: 0,
    totalCustomer: 0,
    similarMenu:[],

    isMenuError: false,
    menuError: '',

    index: 0,

    isFavourite: false,
    isFavouriteLoading: true,
    isFavouriteError: false,
    favouriteError: '',

    favouriteMenuData: [],
    isFavouriteMenuDataLoading: true,
    isFavouriteMenuDataError: false,
    favouriteMenuDataError: '',

    isDeleteFavSuccess: null,
    isDeleteFavLoading: true,
    isDeleteFavError: false,
    deleteFavError: '',


    cuisineID: '',



}



export const getMenu = createAsyncThunk('menuItemSlice/menuItem', async (dataInfo) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
    }
    const res = await axios.get(`http://localhost:4000/getMenu/${dataInfo?.id}?email=${dataInfo?.userEmail}`, config)
    const data = res.data
    console.log(data, '[[]]')

    const res2=await axios.get(`http://localhost:4000/getSimilarMenu/${data.category}?id=${data._id}`, config)
    const data2 = res2.data
    return { id: data._id, itemName: data.itemName, price: data.price, time: data.time, urls: data.urls, cuisine: data.cuisine, category: data.category, ingredients: data.ingredients, canReview: data.canReview, averageRating: data.averageRating, totalCustomer: data.totalCustomer,similarMenu:data2 }
})

export const isFavMenu = createAsyncThunk('menuItemSlice/FavMenuItem', async (id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
    }
    const res = await axios.get(`http://localhost:4000/favMenu/${id}`, config)
    const data = res.data

    return data.result
})

export const getFavMenuData = createAsyncThunk('menuItemSlice/FavMenuItemData', async (email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
    }
    const res = await axios.get(`http://localhost:4000/favMenuData/${email}`, config)
    const data = res.data
    return data
})

export const deleteFavMenuData = createAsyncThunk('menuItemSlice/deleteFavMenuItem', async (menuData) => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
    }

    const res = await axios.delete(`http://localhost:4000/deleteFavMenu?email=${menuData.userEmail}&menuId=${menuData.menuID}`, config)
    const data = res.data
    //console.log(data, '[[---]]')

    if (data.deletedCount == 1) {
        return { result: true }
    }
    else {
        return { result: false }
    }
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
        setFavDeleteSuccess: (state, { payload }) => {
            state.isDeleteFavSuccess = payload
        },
        setCuisineId: (state, { payload }) => {
            state.cuisineID = payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMenu.pending, (state) => {
                state.menuID = ''
                state.itemName = ''
                state.isLoading = true
                state.ingredients = ''
                state.category = ''
                state.time = []
                state.cuisine = ''
                state.price = []
                state.urls = []
                state.averageRating = 0
                state.totalCustomer = 0
                state.similarMenu=[]

                state.isMenuError = false,
                state.menuError = ''
            })
            .addCase(getMenu.fulfilled, (state, { payload }) => {
                state.menuID = payload.id
                state.itemName = payload.itemName
                state.isLoading = false
                state.ingredients = payload.ingredients
                state.category = payload.category
                state.time = payload.time
                state.cuisine = payload.cuisine
                state.price = payload.price
                state.urls = payload.urls
                state.averageRating = payload.averageRating
                state.totalCustomer = payload.totalCustomer
                state.similarMenu=payload.similarMenu

                state.isMenuError = false,
                state.menuError = ''
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.menuID = ''
                state.itemName = ''
                state.isLoading = false
                state.ingredients = ''
                state.category = ''
                state.time = []
                state.cuisine = ''
                state.price = []
                state.urls = []
                state.averageRating = 0
                state.totalCustomer = 0,
                state.similarMenu=[]

                state.isMenuError = true,
                state.menuError = action.error.message;
            })
            .addCase(isFavMenu.pending, (state) => {
                state.isFavourite = false
                state.isFavouriteLoading = true
                state.isFavouriteError = false
                state.favouriteError = ''
            })
            .addCase(isFavMenu.fulfilled, (state, { payload }) => {
                state.isFavourite = payload
                state.isFavouriteLoading = false
                state.isFavouriteError = false
                state.favouriteError = ''
            })
            .addCase(isFavMenu.rejected, (state, action) => {
                state.isFavourite = false
                state.isFavouriteLoading = false
                state.isFavouriteError = true
                state.favouriteError = action.error.message
            })
            .addCase(getFavMenuData.pending, (state) => {
                state.favouriteMenuData = state.favouriteMenuData
                state.isFavouriteMenuDataLoading = true
                state.isFavouriteMenuDataError = false
                state.favouriteMenuDataError = ''
            })
            .addCase(getFavMenuData.fulfilled, (state, { payload }) => {
                state.favouriteMenuData = payload
                state.isFavouriteMenuDataLoading = false
                state.isFavouriteMenuDataError = false
                state.favouriteMenuDataError = ''
            })
            .addCase(getFavMenuData.rejected, (state, action) => {
                state.favouriteMenuData = []
                state.isFavouriteMenuDataLoading = false
                state.isFavouriteMenuDataError = true
                state.favouriteMenuDataError = action.error.message
            })
            .addCase(deleteFavMenuData.pending, (state) => {
                state.isDeleteFavError = false
                state.deleteFavError = ''
                state.isDeleteFavLoading = true
                state.isDeleteFavSuccess = null
            })
            .addCase(deleteFavMenuData.fulfilled, (state, { payload }) => {
                state.isDeleteFavError = false
                state.deleteFavError = ''
                state.isDeleteFavLoading = false
                state.isDeleteFavSuccess = payload.result
            })
            .addCase(deleteFavMenuData.rejected, (state, action) => {
                state.isDeleteFavError = true
                state.deleteFavError = action.error.message
                state.isDeleteFavLoading = false
                state.isDeleteFavSuccess = null
            })

    },

})

export const { increment, decrement, setFavDeleteSuccess, setCuisineId } = menuDetailsSlice.actions

export default menuDetailsSlice.reducer