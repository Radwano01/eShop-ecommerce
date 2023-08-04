import React from 'react'
import "./search.scss"
import {BiSearch} from "react-icons/bi"

const Search = ({value, onChange}) => {
  return (
    <div className='search'> 
        <BiSearch size={18} className="search-icon"/>
        <input type="text" placeholder='Search by name' value={value} onChange={onChange}/>
    </div>
  )
}

export default Search