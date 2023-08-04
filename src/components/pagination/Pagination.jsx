import React, { useState } from 'react'
import "./pagination.scss"

const Pagination = ({currentPage, setCurrentPage, productPerPage, totalProducts}) => {

    const pageNumbers = []
    const totalPages = totalProducts / productPerPage

    const [pageNumberLimit]= useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    const paginate = ()=>{
        setCurrentPage(currentPage)
    }

    const paginatePrev = ()=>{
        setCurrentPage(currentPage - 1)
        if((currentPage -1) % pageNumberLimit === 0 ){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const paginateNext = ()=>{
        setCurrentPage(currentPage + 1)
        if(currentPage + 1 > maxPageNumberLimit){
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    for(let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++){
        pageNumbers.push(i)

    }
  return (
    <div className='pagination'>
         <li onClick={paginatePrev} className={currentPage === pageNumbers[0] ? "hidden" : null}>prev</li>
         {pageNumbers.map((number)=>{
            
            if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
                return <li key={number} onClick={()=> paginate(number)} className={currentPage === number ? `${"paginate-active"}` : ""}>{number}</li>
            }
         })}
         <li onClick={paginateNext} className={currentPage === pageNumbers[pageNumbers.length - 1] ? "hidden" : null}>Next</li>
         <p>
            <b className='page'>{`page ${currentPage}`}</b>
            <span>{` of `}</span>
            <b>{`${Math.ceil(totalPages)}`}</b>
         </p>
    </div>
  )
}

export default Pagination