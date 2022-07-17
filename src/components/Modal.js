import React, { useEffect } from 'react'

import { Button } from '@mui/material'

import './Modal.css'
import { logout } from '../features/userSlice'
import { useDispatch } from 'react-redux';
import { auth } from './firebase';



const Modal = ({ setModal }) => {

    const dispath = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispath(logout());
        })
        setModal(false)
    }

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='title'>
                <h2>Are You Sure? Your Cart Will Be Reset</h2>
            </div>
            <div className='footer'>
                <Button variant='contained' color='primary' onClick={() => setModal(false)}>Stay</Button>
                <Button variant='contained' color='error' onClick={signOut} >Leave</Button>
                
            </div>
        </div>
    </div>
  )
}

export default Modal