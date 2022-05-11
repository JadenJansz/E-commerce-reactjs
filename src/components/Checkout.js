import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form';

import { Avatar, Button, IconButton, Switch, TextField } from '@material-ui/core'
import Brightness4Icon from '@mui/icons-material/Brightness4';


import './Checkout.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth, db } from './firebase';
import { changeTheme } from '../features/themeSlice';
import firebase from 'firebase/compat/app';

import cartImage from '../images/786686.png'
import { fetchDetails } from '../features/checkoutSlice';

const Checkout = () => {

  const user = useSelector((state) => state.user.user);
  const theme = useSelector(state => state.theme);
  const cart = useSelector(state => state.cart)

    const dispath = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispath(logout());
        })
    }

  const { handleSubmit, formState: {errors}, control } = useForm({
      defaultValues: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: ''

      }
  });
  console.log(cart);
  const navigate = useNavigate();

  
  
  const onSubmit = data => {
    //console.log(data);
    
    navigate('/payment');
    dispath(fetchDetails(data));
    
  }
  //console.log(errors)
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
        <Brightness4Icon /><Switch onChange={() => dispath(changeTheme())} edge='start' color='default' />
        <p style={{ fontSize:'small' }} >Welcome : {user?.displayName}</p>
            <IconButton>
                <Avatar src={user?.photoUrl} />
            </IconButton>
        </div>
      </div>
      <div className='checkout_main' id={theme}>
        <h1>Enter Your Billing Details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='checkout_form' id={theme}>
              <div className='checkout_input' >
              <Controller 
                name='firstName'
                control={control}
                rules={{ required: '*field is required' }}
                render={({ field: { ref, ...field} }) => (
                  <TextField
                    { ...field }
                    id='firstName' 
                    label='First Name'
                    variant='outlined'
                    error={!!errors.firstName}
                    helperText={errors.firstName ? errors.firstName?.message : ''}  />
                )}
              />
              
            </div>
            <div className='checkout_input'>
              <Controller 
                name='lastName'
                control={control}
                rules={{ required: '*field is required' }}
                render={({ field: { ref, ...field} }) => (
                  <TextField
                    { ...field }
                    id='lastName' 
                    label='Last Name'
                    variant='outlined'
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName?.message : ''}  />
                )}
              />

            </div>
              <div className='checkout_input'>
              <Controller 
                name='address'
                control={control}
                rules={{ required: '*field is required' }}
                render={({ field: { ref, ...field} }) => (
                  <TextField
                    { ...field }
                    id='address' 
                    label='Address'
                    variant='outlined'
                    error={!!errors.address}
                    helperText={errors.address ? errors.address?.message : ''}  />
                )}
              />
              
              </div>
              <div className='checkout_input'>
              
              <Controller 
                name='city'
                control={control}
                rules={{ required: '*field is required' }}
                render={({ field: { ref, ...field} }) => (
                  <TextField
                    { ...field }
                    id='city' 
                    label='City'
                    variant='outlined'
                    error={!!errors.city}
                    helperText={errors.city ? errors.city?.message : ''}  />
                )}
              />
              </div>
              <div className='checkout_input'>
              <Controller 
                name='postalCode'
                control={control}
                rules={{ required: '*field is required' }}
                render={({ field: { ref, ...field} }) => (
                  <TextField
                    { ...field }
                    id='postalCode' 
                    label='Postal Code'
                    variant='outlined'
                    error={!!errors.postalCode}
                    helperText={errors.postalCode ? errors.postalCode?.message : ''}  />
                )}
              />
              
              </div>
              </div>
                {/* <CusTextField id='lastName' label='Last Name'  />
                <CusTextField id='address' label='Address'  />
                <CusTextField id='city' label='City'  />
                <CusTextField id='postalCode' label='Postal Code'  /> */}
          <div className='checkout_button'>
            <Button color='secondary' variant='contained' component={Link} to='/cart' >Back To Cart</Button>
            <Button type='submit' color='primary'  variant='contained'>Next</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout