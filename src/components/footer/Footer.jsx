import React from 'react'
import "./footer.scss"

const date = new Date()
const year = date.getFullYear()

const Footer = () => {

  
  return (
    <div className='footer-container'>
      <div className='footer'>
        &copy; {year} All Rights Reserved
      </div>
    </div>

  )
}

export default Footer