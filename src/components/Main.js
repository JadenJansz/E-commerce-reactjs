import React from 'react'
import Products from './Products'

import './Main.css'
import { useSelector } from 'react-redux'

const Main = ({ handleAddToCart }) => {
  //console.log(category)

  const theme = useSelector(state => state.theme) 
  return (
    <div className='main' id={theme}>
      <div className='main_content'>
        <Products handleAddToCart={handleAddToCart} />
      </div>
    </div>
  )
}

export default Main