
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    isShowReviews: false,
    reviewMessage:'',
    rating: 0,
    itemsInfo:[],
    selectedValue:'',
    paymentId:''
}

export const userReviewsSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setRating: (state, { payload }) => {
            state.rating = payload
        },
        setReviewMessage: (state, { payload }) => {
            state.reviewMessage = payload
        },
        showReviews: (state, { payload }) => {
            //console.log(payload)
            state.isShowReviews = payload
        },

        setItemsInfo:(state,{payload})=>{
            state.itemsInfo = [...payload]
        },
        setSelectedValue:(state,{payload})=>{
            state.selectedValue = payload
        },
      setPaymentId:(state,{payload})=>{
            state.paymentId = payload
        },

        resetReviewData:(state)=>{
            state.itemsInfo = []
            state.rating = 0
            state.selectedValue = ''
            state.reviewMessage=''
            state.paymentId=''
        }
    },
})

// Action creators are generated for each case reducer function
export const { setRating, showReviews, setReviewMessage ,setItemsInfo,resetReviewData, setSelectedValue, setPaymentId} = userReviewsSlice.actions

export default userReviewsSlice.reducer