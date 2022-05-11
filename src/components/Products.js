import { Grid } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import Product from './Product';

import './Products.css'

const Products = ({ handleAddToCart }) => {

  const products = useSelector((state) => state.products.products)
  
  return (
    <div className='products'>
        <Grid container justifyContent='center' spacing={2}>
            {products.map((product) => (
              <Grid item key={product.id}  xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} handleAddToCart={handleAddToCart} />
              </Grid>
            )) 
            }
        </Grid>
    </div>
  )
}

export default Products