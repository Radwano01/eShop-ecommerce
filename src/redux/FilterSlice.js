import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []
}

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action)=>{
        const {product, search} = action.payload;
        const tempProducts = product.filter((product)=> product.name.toLowerCase().includes(search.toLowerCase())
         || product.category.toLowerCase().includes(search.toLowerCase()))

         state.filteredProducts = tempProducts
    },
    FILTER_BY_SORT:(state, action)=>{
        const {product, sort} = action.payload;
        let tempProducts = [...product]
        state.filteredProducts = tempProducts

        if (sort === "latest") {
            
          } else if (sort === "lowest-price") {
            tempProducts.sort((a, b) => a.price - b.price);
          } else if (sort === "highest-price") {
            tempProducts.sort((a, b) => b.price - a.price);
          } else if (sort === "a-z") {
            tempProducts.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sort === "z-a") {
            tempProducts.sort((a, b) => b.name.localeCompare(a.name));
          }
        
    },
    FILTER_BY_CATEGORY:(state, action)=>{
      const {products, category} = action.payload;
      let tempProducts = []
      
      if(category === "All"){
        tempProducts = products
      }else{
        tempProducts = products.filter((product)=> product.category === category)
      }
      state.filteredProducts = tempProducts
    },
    FILTER_BY_BRAND:(state, action)=>{
      const {products, brand} = action.payload;
      let tempProducts = []
      
      if(brand === "All"){
        tempProducts = products
      }else{
        tempProducts = products.filter((product)=> product.brand === brand)
      }
      state.filteredProducts = tempProducts
    },
    CLEAR_FILTERS:(state, action)=>{
      const {products} = action.payload
      state.filteredProducts = [...products]
    }
  }
});

export const {FILTER_BY_SEARCH, FILTER_BY_SORT, FILTER_BY_CATEGORY, FILTER_BY_BRAND, CLEAR_FILTERS} = FilterSlice.actions

export default FilterSlice.reducer