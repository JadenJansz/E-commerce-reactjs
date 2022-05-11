import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { increaseCart, decreaseCart, removeCartItem } from '../features/cartSlice'

import './CartItem.css'

const CartItem = ({ item, handleUpdateCart }) => {

  //console.log(item); 
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme)
 
  return (
        <Card className='cart-card'>
            <CardMedia >
                <img className='cart-card_img' src={item.item.image} alt='product'/>
            </CardMedia>
            <Box className='cart-box'  id={theme} >
            <CardContent className='cart-content' id={theme}>
                <div className='cart-content-description'>
                  <span>{item.item.title}</span><hr className='hrf'/><br/>
                  
                  <span style={{ fontSize:'small' }}>{item.item.description}</span>
                  
                </div>
                <div className='cart-content-price'>
                    <Typography variant='h6'>$ {item.item.price}</Typography>
                    
                </div>
            </CardContent>
            <CardActions style={{ marginLeft:'10px' }}>
                    <Button variant='contained' type='button' onClick={() => {dispatch(decreaseCart(item.item))}} >-</Button>
                      <p style={{ padding:'20px' }}>{item.qty}</p>
                    <Button variant='contained' type='button' onClick={() => {dispatch(increaseCart(item.item))}} >+</Button>
              </CardActions>
              <div className='cart-total'>
              <Button variant='contained' color='secondary' type='button' onClick={() => {dispatch(removeCartItem(item.item))}} >Remove</Button>
              <Typography  variant='h5'>Total : $ {(item.qty*item.item.price).toFixed(2)}</Typography>
              </div>
            </Box>
              
        </Card>
  )
}

export default CartItem