  import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      cartTotalQuantity: 0,
      cartTotalAmount:0,
      previousURL: "",
  }

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      ADD_TO_CARD:(state, action)=>{
        const productIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)

        if(productIndex >= 0){
          //if the product exists the quantity with increase
          state.cartItems[productIndex].cartTotalQuantity += 1
        }else{
          const tempProduct = {...action.payload, cartTotalQuantity: 1,}
          
          state.cartItems.push(tempProduct)
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      },
      DECREASE_CART:(state, action)=>{
        const productIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)

        if(state.cartItems[productIndex].cartTotalQuantity > 1){
          state.cartItems[productIndex].cartTotalQuantity -= 1
        }else if (state.cartItems[productIndex].cartTotalQuantity === 1){
          const newCartItem = state.cartItems.filter((item)=> item.id !== action.payload.id)
          state.cartItems = newCartItem
        }
      },
      DELETE_CART:(state, action)=>{
        const productIndex = state.cartItems.filter((item)=>item.id !== action.payload.id)
        state.cartItems = productIndex
      },
      CLEAR_CART:(state, action)=>{
        state.cartItems = []
      },
      CALCULATE_SUBTOTAL:(state)=>{
        const array = []
        state.cartItems?.map((item)=>{
          const {price, cartTotalQuantity} = item
          const cartItemAmount = price * cartTotalQuantity
          return array.push(cartItemAmount)
        })
        const reducer = array?.reduce((a, b)=> {
          return a + b
        }, 0)
        state.cartTotalAmount = reducer
      },
      CALCULATE_TOTAL_QUANTITY:(state, action)=>{
        const array = []
        state.cartItems?.map((item)=>{
          const {cartTotalQuantity} = item
          const quantity = cartTotalQuantity
          return array.push(quantity)
        })
        const reducer = array?.reduce((a, b)=> {
          return a + b
        }, 0)
        state.cartTotalQuantity = reducer
      },
      SAVE_URL:(state, action)=>{
        state.previousURL = action.payload
      }
    }
  });

  export const {ADD_TO_CARD, DECREASE_CART, DELETE_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY,SAVE_URL} = cartSlice.actions

  export default cartSlice.reducer