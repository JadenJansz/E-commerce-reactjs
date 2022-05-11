import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Badge, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Switch from '@mui/material/Switch';
import cartImage from '../images/786686.png'



import './Header.css'
import { auth } from './firebase';
import { logout } from '../features/userSlice';
import { changeTheme } from '../features/themeSlice';


const Header = ({ cart }) => {

    

    const user = useSelector((state) => state.user.user);
    const theme = useSelector((state) => state.theme);
    const dispath = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispath(logout());
        })
    }

  return (
    <div className='header' id={theme}>
        <div className='header_left'>
            <Link to='/'>
            <img className='header_left_img' src={cartImage} alt='logo'  />
            </Link>
            <h4>E - commerce</h4>
            <div className='location'>
            <IconButton className="location_svg" id={theme}>
                <LocationOnIcon  />
            </IconButton>
            <h6>Select<br/> Your<br/> Location</h6>
            </div>
        </div>

        <div className='header_location'>
            
        </div>

        <div className='header_middle'>
            <SearchIcon />
            <input type='text' placeholder='Search' />
        </div>

        <div className='header_right'>
            <Brightness4Icon /><Switch onChange={() => dispath(changeTheme())} edge='start' />
            <IconButton color='inherit' component={Link} to="/cart" >
            <Badge badgeContent={cart.length > 0 ? cart.length : '0'} color='secondary' overlap='rectangular' >
                <ShoppingCart  />
            </Badge>
            </IconButton>
            <p style={{ fontSize:'small' }} >Welcome : {user?.displayName}</p>
            <IconButton>
                <Avatar  src={user?.photoUrl}  />
            </IconButton>
        </div>
    </div>
  )
}

export default Header