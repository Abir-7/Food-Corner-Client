import { configureStore } from '@reduxjs/toolkit'
import baseApi from './api/baseApi'
import imageSlideSliceReducer from './feature/imageSildeSlice/imageSlideSlice'
import cartActionSliceReducer from './feature/cartProductSlice/cartProductSlice'
import userProfileSliceReducer from './feature/updateProfileSlice/userProfileSlice'


export const store = configureStore({

  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,

    imageSlideSlice: imageSlideSliceReducer,
    cartProductSlice: cartActionSliceReducer,
    userProfileSlice: userProfileSliceReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),


})