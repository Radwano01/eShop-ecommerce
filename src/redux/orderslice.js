import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory:[],
    orderAmount:null,
}

const orderslice = createSlice({
  name: "order",
  initialState,
  reducers: {
    STORE_ORDERS:(state, action)=>{
        state.orderHistory = action.payload
    },
    CALC_TOTAL_ORDER_AMOUNT:(state, action)=>{
      const array = []
      state.orderHistory.map((order)=>{    
        const {orderAmount} = order
        return(
          array.push(orderAmount)
        )
      })
      const reducer = array.reduce((a,b)=>{
        return a + b
      }, 0) 
      state.orderAmount = reducer
    }
  }
});

export const {STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT} = orderslice.actions

export default orderslice.reducer