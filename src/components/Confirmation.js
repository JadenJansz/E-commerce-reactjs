import React, { useEffect } from 'react'

import { Avatar, Button, IconButton, Switch } from '@material-ui/core'
import Brightness4Icon from '@mui/icons-material/Brightness4';

import { Link, useNavigate } from 'react-router-dom'
import { changeTheme } from '../features/themeSlice'
import { useDispatch, useSelector } from 'react-redux';

import cartImage from '../images/786686.png'
import { deleteCart } from '../features/cartSlice';

const Confirmation = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = useSelector((state) => state.user.user);
    const theme = useSelector(state => state.theme);
    const checkout = useSelector(state => state.checkout);


  return (
    <>
      <div className='checkout_header' id={theme} >
        <div className='checkout_header_left'>
          <Link to='/'>
            <img className='checkout_header_left_img' src={cartImage} alt='e-commerce' />
          </Link>
            <h4>E - commerce</h4>
        </div>
        <div className='checkout_header_right'>
        <Brightness4Icon /><Switch onChange={() => dispatch(changeTheme())} edge='start' color='default' />
        <p style={{ fontSize:'small' }} >Welcome : {user?.displayName}</p>
            <IconButton>
                <Avatar src={user?.photoUrl} />
            </IconButton>
        </div>
      </div>
      <div className='payment_main' id={theme} >
        <h1>Checkout</h1>
        <h3>Thank you for your purchase {`${checkout.firstName} ${checkout.lastName}`}!</h3><br/><hr style={{width:'100%'}} /><br />
        <Button variant='contained' color='primary' onClick={() => navigate('/')}>Back To Home</Button>
      </div>
    </>
  )
}

export default Confirmation