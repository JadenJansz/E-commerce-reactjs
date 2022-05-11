import React, { useEffect, useState } from 'react'
import { createContext } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Checkout from './components/Checkout';
import EmptyCart from './components/EmptyCart';
import Payment from './components/Payment';
import Login from './components/Login';
import Cart from './components/Cart';

import './App.css'

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/productSlice';
import { auth } from './components/firebase';
import { login } from './features/userSlice';
import { changeTheme } from './features/themeSlice';
import Confirmation from './components/Confirmation';

export const ThemeContext = createContext(null);


const App = () => {
  const dispatch = useDispatch(); 

  //const [category, setCategory] = useState([]);
  // const [cart, setCart] = useState([]);

  const category = useSelector((state) => state.category.selectedCategory)
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user.user)
  const theme = useSelector((state) => state.theme)
  
  const handleCategory = async () => {

      const response = await fetch(category ? `https://fakestoreapi.com/products/category/${category}` : `https://fakestoreapi.com/products`);
      const data = await response.json();
      
      dispatch(fetchProducts(data));
  }

  const toggleTheme = () => {
      dispatch(changeTheme())
  }

  useEffect(() => {
    handleCategory();
  }, [category])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(
            login({
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
            })
        )
      }
    })
  }, [])

  // const handleAddToCart = (product) => {
  //     const exist = cart.find((x) => x.id === product.id);

  //     if(exist){
  //         setCart(
  //             cart.map((x) => 
  //               x.id === product.id ? { ...exist, qty: exist.qty + 1} : x
  //           )
  //         )
          
  //     }else{
  //       setCart([...cart, {...product, qty: 1}]);
        
  //     }

  //     console.log(exist);
  // }

  // const handleUpdateCart = (operation, id) => {
  //   const exist = cart.find((x) => x.id === id);

  //     if(operation === 'Add'){
  //         setCart(
  //             cart.map((x) => 
  //                 x.id === id ? {...x, qty: x.qty + 1} : x
  //             )
  //         )
  //     }else if(operation === 'Reduce'){
  //         (exist.qty === 1 ? setCart(cart.filter((x) => x.id !== id )) : 
          
  //         setCart(
  //           cart.map((x) => 
  //               x.id === id ? {...x, qty: x.qty - 1} : x
  //           )
  //          )
  //         )
  //     }else if(operation === 'Remove'){
  //         setCart(cart.filter((x) => x.id !== id ))
  //     }
  // }

  // const handleDeleteCart = () => {
  //   setCart([]);
  // }
 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <Router>
      {!user ? ( <Login /> 
       )  :  (
      <div className='app' id={theme}>
      <div className='appBody' >
      <Routes>
  
      <Route path='/' element={<>
                                <Header cart={cart} />
                                <Sidebar />
                                <Main   /> 
                              </>} />
      
      <Route path='/cart' element={cart.length === 0 ? 
                                        <EmptyCart /> : 
                                            <Cart 
                                              cart={cart} 
                                        />} 
      />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/payment'  element={<Payment />} />
      <Route path='/confirmation'  element={<Confirmation />} />
      </Routes>
      </div>
    </div>)}
      
    </Router>
    </ThemeContext.Provider>
  )
}

export default App