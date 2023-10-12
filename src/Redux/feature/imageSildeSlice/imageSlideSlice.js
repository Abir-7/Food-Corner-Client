import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  index: 0,

}

export const imageSlideSlice = createSlice({
  name: 'imageSlideAction',
  initialState,
  reducers: {
    increment: (state,{payload}) => {
        if(payload.index==payload.length-1){
            state.index=0
        }
        else{
            state.index=state.index+1
        }
    },
    decrement: (state,{payload}) => {
        if(payload.index==0){
            state.index=payload.length-1
        }
        else{
            state.index=state.index-1
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = imageSlideSlice.actions

export default imageSlideSlice.reducer