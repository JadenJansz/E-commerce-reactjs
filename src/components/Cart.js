import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCart } from '../features/cartSlice'

import './Cart.css'
import CartItem from './CartItem'
import Header from './Header'
import Sidebar from './Sidebar'

const Cart = ({ handleUpdateCart }) => {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart)
  const theme = useSelector(state => state.theme)

  const [subTotal, setSubTotal] = useState(0);

  const fetchPrice = () =>  {
    setSubTotal(0)
    cart.map((x) => 
        setSubTotal(prev => prev + (x.item.price*x.qty))
    )
  }


  useEffect(() => {
    fetchPrice();
  },[cart]);

  console.log(cart)

  return (
    <>
    <Header cart={cart} />
    <Sidebar />
    <div className='cart' id={theme}>
        <div className='card_content'>
            {cart.map((cartItem) => 
                <CartItem key={cartItem.item.id} item={cartItem} handleUpdateCart={handleUpdateCart} />
            ) }
        </div>

        <div className='cart-checkout'>
          <h2>Sub Total : $ {(subTotal).toFixed(2)}</h2>
          <div className='cart-checkout-button'>
          <Button style={{ marginRight: '25px'}} variant='contained' color='secondary' type='button' onClick={() => {dispatch(deleteCart())}} >Empty Cart</Button>
          <Button variant='contained' color='primary' type='button' component={Link} to='/checkout'>Check Out</Button>
          </div>
        </div>
    </div>
    </>
  )
}

export default Cart