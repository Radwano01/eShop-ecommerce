import FilterSlice from "../redux/FilterSlice";
import ProductSlice from "../redux/ProductSlice";
import Slice from "../redux/Slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "../redux/cartSlice";
import checkoutSlice from "../redux/checkoutSlice";
import orderslice from "../redux/orderslice"

const rootReducer = combineReducers({
    slice : Slice,
    product: ProductSlice,
    filter: FilterSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
    order: orderslice,
})

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultNormalizer)=>
    getDefaultNormalizer({
        serializableCheck: false,
    })
})

export default store