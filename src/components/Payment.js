import { Avatar, Button, IconButton, Switch, Typography } from '@material-ui/core';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

import './Payment.css'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/userSlice';
import { auth, db } from './firebase';
import { changeTheme } from '../features/themeSlice';
import firebase from 'firebase/compat/app';

import cartImage from '../images/786686.png'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const Payment = () => {

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const theme = useSelector(state => state.theme);
  const checkout = useSelector(state => state.checkout);

  const cartItems = [];

  {cart.map(x => (
      cartItems.push({ID: x.item.id, QTY: x.qty})
  ))}

  console.log(checkout);
  const dispath = useDispatch();

    const signOut = () => { 
        auth.signOut().then(() => {
            dispath(logout());
        })
    }
  
  const navigate = useNavigate();

  console.log(cart)

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

  const handleSubmit = async (event, elements, stripe) => {
      event.preventDefault();

      if(!stripe || !elements) return;

      const cardElements = elements.getElement(CardElement);

      const { error, paymentMethod} = await stripe.createPaymentMethod({ type:'card', card: CardElement })

      if(error){
        console.log(error);
        }
        else{
          db.collection("orders").add({
            name: `${checkout.firstName} ${checkout.lastName}`,
            address: checkout.address,
            city: checkout.city,
            postalCode: checkout.postalCode,
            cart: cartItems,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

          navigate('/confirmation');
        }
      }
  

  return (
    <>
      <div className="checkout_header">
        <div className="checkout_header_left">
          <Link to='/'>
            <img className='checkout_header_left_img' src={cartImage} alt='e-commerce' />
          </Link>
          <h4>E - commerce</h4>
        </div>
        <div className="checkout_header_right">
        <Brightness4Icon /><Switch onChange={() => dispath(changeTheme())} edge='start' color='default' />
        <p style={{ fontSize:'small' }} >Welcome : {user?.displayName}</p>
            <IconButton>
                <Avatar src={user?.photoUrl} />
            </IconButton>
        </div>
      </div>
      <div className='payment_main' id={theme} >
        <h1>Checkout</h1>
        <p>Order Summary</p><br />
          {cart.map((cartItem) => (
            <div className='cart_details' key={cartItem.item.id}>
            <div className='cart_title'>
                <Typography variant='subtitle1' style={{ textOverflow:'ellipsis' }}>{cartItem.item.title}</Typography>
                <Typography variant='subtitle2' gutterBottom>Qty : {cartItem.qty}</Typography>
            </div>
            <div>
                <p>$ {(cartItem.item.price*cartItem.qty).toFixed(2)}</p>
            </div>
            </div>
          ))}
          <hr style={{ width: '80%', margin:'auto' }} /><br/>
          <p>Payment Method</p><br />
      <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement className='payment_method' id={theme} options={{width: '100%'}}/>
                        <br/><br/>
                        <div className='payment_card'>
                            <Button variant='contained' color='secondary' onClick={() => navigate('/checkout')}>Back</Button>
                            <Button type='submit' variant='contained' color='primary' >
                                Pay $ {(subTotal).toFixed(2)}
                            </Button>
                        </div>
                    </form>
                )}
            </ElementsConsumer>
      </Elements>
      </div>
      
    </>
  );
}

export default Payment