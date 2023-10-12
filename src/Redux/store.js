import { configureStore } from '@reduxjs/toolkit'
import baseApi from './api/baseApi'
import  imageSlideSliceReducer  from './feature/imageSildeSlice/imageSlideSlice'
import  cartActionSliceReducer from './feature/cartProductSlice/cartProductSlice'



export const store = configureStore({

    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
   
        imageSlideSlice: imageSlideSliceReducer,
        cartProductSlice:cartActionSliceReducer,
      
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),


})