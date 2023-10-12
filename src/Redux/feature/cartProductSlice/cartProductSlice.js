import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  itemNumber: 0,
  option:0,
  isShowReviews:false,
}

export const cartProductSlice = createSlice({
  name: 'cartItemAction',
  initialState,
  reducers: {
    singleItemIncrement: (state) => {
            state.itemNumber=state.itemNumber+1
    },
    singleItemDecrement: (state) => {
        if(state.itemNumber<=0){
            state.itemNumber=0
        }
        else{
            state.itemNumber=state.itemNumber-1
        }
    },
    singleItemSize:(state,{payload})=>{
      state.option=payload
    },
    showReviews:(state,{payload})=>{
      console.log(payload)
      state.isShowReviews=payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { singleItemIncrement, singleItemDecrement,singleItemSize,showReviews} = cartProductSlice.actions

export default cartProductSlice.reducer