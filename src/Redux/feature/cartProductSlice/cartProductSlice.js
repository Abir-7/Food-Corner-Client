import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  itemNumber: 0,
  option: 0,
  isShowReviews: false,
  isCartSlideOpen: false,
  cartItem: [],
  totalPrice: 0,
  discountOffer: 0,
}

export const cartProductSlice = createSlice({
  name: 'cartItemAction',
  initialState,
  reducers: {
    singleItemIncrement: (state) => {
      state.itemNumber = state.itemNumber + 1
    },
    singleItemDecrement: (state) => {
      if (state.itemNumber <= 0) {
        state.itemNumber = 0
      }
      else {
        state.itemNumber = state.itemNumber - 1
      }
    },
    singleItemSize: (state, { payload }) => {
      state.option = payload
    },
    showReviews: (state, { payload }) => {
      console.log(payload)
      state.isShowReviews = payload
    }
    ,
    showCartSlide: (state, { payload }) => {
      state.isCartSlideOpen = payload
    },
    addCart: (state, { payload }) => {
      const existingItem = state.cartItem.find(item => item.name === payload.name);

      if (existingItem) {
        // If the item exists, update its amount by one
        const updatedCart = state.cartItem.map(item =>
          item.name === payload.name ? { ...item, amount: item.amount + 1 } : item
        );
        return { ...state, cartItem: updatedCart };
      }
      else {
        // If the item doesn't exist, add it with an amount of 1
        const newItem = { ...payload, amount: 1 };
        const updatedCart = [...state.cartItem, newItem];
        return { ...state, cartItem: updatedCart };
      }
    },
    cartTotalPrice: (state, { payload }) => {

      const price = state.cartItem.reduce((total, item) => {
        return total + (parseInt(item.price) * parseInt(item.amount));
      }, 0)
      console.log(state.totalPrice,'----------cart slice')
      if (state.totalPrice >= payload.price) {
        const discountAmount = (state.totalPrice * payload.discount) / 100
        state.discountOffer = discountAmount
      }
      else {
        state.discountOffer = 0
      }
      state.totalPrice = price;

    },
    modifyCart: (state, { payload }) => {
      const existingItem = state.cartItem.find(item => item.name === payload.name);

      if (payload.action == 'plus') {
        if (existingItem) {

          const updatedCart = state.cartItem.map(item =>
            item.name === payload.name ? { ...item, amount: item.amount == 0 ? 0 : item.amount - 1 } : item
          );
          return { ...state, cartItem: updatedCart };
        }
      }
      else {
        const updatedCart = state.cartItem.map(item =>
          item.name === payload.name ? { ...item, amount: item.amount + 1 } : item
        );
        return { ...state, cartItem: updatedCart }
      }
    }
    ,
    removeCartItem:(state,{payload})=>{
      const updatedCart=state.cartItem.filter(item=>item.name!==payload)
      return {...state,cartItem:updatedCart}
    }
  },
})

// Action creators are generated for each case reducer function
export const { singleItemIncrement, singleItemDecrement, singleItemSize, showReviews, showCartSlide, addCart, cartTotalPrice, modifyCart,removeCartItem } = cartProductSlice.actions

export default cartProductSlice.reducer