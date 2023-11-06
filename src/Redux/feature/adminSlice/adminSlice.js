import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"





const initialState = {
    isAdmin: null,
    isAdminLoading: true,
    isAdminError: false,
    adminError: ''
}


export const checkAdmin = createAsyncThunk('adminSlice/checkAdmin', async () => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
    }

    try {
        const res = await axios.get('https://food-corner-server-lyart.vercel.app/user/admin',config);
        const data = res.data;
        //console.log(data, 'check admin',res)
        return {data};
  
    } catch (error) {
        //console.log(error.response.data.isAdmin            ,'slice')
        return {data:error.response.data.isAdmin}
    }

})

const adminSlice = createSlice({
    name: 'adminProfile',
    initialState,
    reducers: {
  
    },

    extraReducers: (builder) => {
        builder
            .addCase(checkAdmin.pending, (state) => {
                state.isAdmin = null
                state.isAdminLoading = true
                state.isAdminError = false
                state.adminError = ''
            })
            .addCase(checkAdmin.fulfilled, (state, { payload }) => {
                state.isAdmin = payload.data
                state.isAdminLoading = false
                state.isAdminError = false
                state.adminError = ''
            })
            .addCase(checkAdmin.rejected, (state, action) => {
                state.isAdmin = null
                state.isAdminLoading = false
                state.isAdminError = true
                state.adminError = action.error.message
            })
    },

})

export const {} = adminSlice.actions

export default adminSlice.reducer