import { configureStore } from '@reduxjs/toolkit'
import baseApi from './api/baseApi'
import imageSlideSliceReducer from './feature/imageSildeSlice/imageSlideSlice'
import cartActionSliceReducer from './feature/cartProductSlice/cartProductSlice'
import userProfileSliceReducer from './feature/updateProfileSlice/userProfileSlice'
import addMenuItemSliceReducer from './feature/addMenuItemSlice/addMenuItemSlice'
import menuDetailsSliceReducer from './feature/menuDetailsSlice/menuDetailsSlice'
export const store = configureStore({

  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,

    imageSlideSlice: imageSlideSliceReducer,
    cartProductSlice: cartActionSliceReducer,
    userProfileSlice: userProfileSliceReducer,
    addMenuItemSlice:addMenuItemSliceReducer,
    menuDetailsSlice:menuDetailsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})