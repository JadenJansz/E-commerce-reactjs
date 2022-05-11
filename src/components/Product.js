import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from '../features/cartSlice';

import { Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './Product.css'

const Product = ({ product, handleAddToCart }) => {

  const theme = useSelector(state => state.theme)

  const dispatch = useDispatch();
  //console.log(product);
  return (
    <div >
      <Card className='card '>
      <CardMedia className='cardmedia' >
          <img className='card_img' src={product.image} alt='img' />
      </CardMedia>

        <CardContent className='content' id={theme}>
          <div className='span'>
            <span className='rate'>{product.rating.rate} <StarIcon style={{ padding:'3px'}} fontSize='inherit' color='warning' /></span>
            <span className='price'>$ {product.price}</span>
          </div>
          <br />
          <p>{product.title}</p><br/>
          <CardActions disableSpacing className='icon'>
            <IconButton aria-label='Add to Cart' onClick={() => {dispatch(createCart(product))} } >
                <AddShoppingCartIcon color='primary' />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  )
}

export default Product