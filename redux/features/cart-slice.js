import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0
}

export const cart = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => {
      return {
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0
      }
    },
    addItem: (state, action) => {
      // return {
      //   cartItems: [],
      //   totalAmount: 0,
      //   totalQuantity: 0
      // }
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id && item.size === newItem.size
      );
      state.totalQuantity = Number(state.totalQuantity) + Number(newItem.amount);
      if (!existingItem) {
        state.cartItems.push({
          _id: newItem._id,
          name: newItem.name,
          slug: newItem.slug,
          salePrice: newItem.salePrice,
          imageUrl: newItem.imageUrl,
          quantity: newItem.amount,
          size: newItem.size,
          totalPrice: Number(Number(newItem.amount) * Number(newItem.salePrice)),
        });
      }
      else {
        existingItem.quantity = Number(existingItem.quantity) + Number(newItem.amount);
        existingItem.totalPrice = (Number(newItem.salePrice) * Number(existingItem.quantity));
      }
      state.totalAmount = state.cartItems.reduce((total, item) => total +
        Number(item.salePrice) * Number(item.quantity), 0
      );
    },
    deleteItems: (state, action) => {
      const { _id, size } = action.payload
      console.log(_id, size)
      const existingItem = state.cartItems.find(item => item._id === _id && item.size === size)

      if (existingItem) {
        state.cartItems = state.cartItems.filter(item => item._id !== _id || item.size !== size)
        state.totalQuantity = state.totalQuantity - existingItem.quantity
      }

      state.totalAmount = state.cartItems.reduce((total, item) => total +
        Number(item.salePrice) * Number(item.quantity), 0
      );
    },
    removeItems: (state, action) => {
      const removeItem = action.payload
      const existingItem = state.cartItems.find((item) => item._id === removeItem._id && item.size === removeItem.size);
      state.totalQuantity--
      existingItem.quantity--;
      existingItem.totalPrice = Number(existingItem.totalPrice) - Number(removeItem.salePrice);
      state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.salePrice) * Number(item.quantity), 0)
    }
  }
})


export const { addItem, deleteItems, removeItems, reset } = cart.actions;
export default cart.reducer;