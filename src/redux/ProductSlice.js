import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products:[],
}

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action)=>{
      state.products = action.payload.products
    }
  }
});

export const {STORE_PRODUCTS} = ProductSlice.actions

export default ProductSlice.reducer