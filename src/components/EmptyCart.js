import { Button } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

import './EmptyCart.css'

const EmptyCart = () =>{

    const cart = useSelector((state) => state.cart)
    const theme = useSelector(state => state.theme)
 
    return (
    <>
        <Header cart={cart} />
        <Sidebar />
      <div className='emptyCart' id={theme}>
          <img src='https://mysibi.com/static/version1649537879/frontend/MageBig/martfury_layout03/en_US/images/empty-cart.svg' height='400px' alt='empty' />
          <div className='emptyCart-button'>
          <h1>Your Cart is<br/> Empty!</h1>
          <Button component={Link} to="/" style={{ marginTop: '25px' }} color='primary' variant='contained' type='button'>Continue Shopping</Button>
          </div>
      </div>
      </>
    )
  }

export default EmptyCart