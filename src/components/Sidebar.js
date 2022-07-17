import React, { useState } from 'react'

import Modal from './Modal'
import { auth } from './firebase';
import { logout } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import SidebarOptions from './SidebarOptions'
import InventoryIcon from '@mui/icons-material/Inventory';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import WatchIcon from '@mui/icons-material/Watch';
import DevicesIcon from '@mui/icons-material/Devices';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import './Sidebar.css'

const Sidebar = ({ closeModal }) => {
  const theme = useSelector(state => state.theme)

  const [selected, setSelected] = useState({id:null, isHeld: false});
  

  const selectedOption = (id, held) => {
 
      setSelected(prev => ({
        id: id,
        held: held
      }));
  }

  
    const dispath = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispath(logout());
        })
    }

   
  return (
    <div className='sidebar' id={theme} >
        <div className='sidebar_top'>
        <SidebarOptions Icon={InventoryIcon} title='All' category=""  selected={selected} onClick={() => {selectedOption(1,true)}} />
        <SidebarOptions Icon={ManIcon} title="Men's" category="men's clothing"  selected={selected} onClick={() => {selectedOption(2,true)}} />
        <SidebarOptions Icon={WomanIcon} title="Women's" category="women's clothing"  selected={selected} onClick={() => {selectedOption(3,true)}}  />
        <SidebarOptions Icon={WatchIcon} title='Jeweley' category="jewelery" selected={selected} onClick={() => {selectedOption(4,true)}} />
        <SidebarOptions Icon={DevicesIcon} title='Electronics' category="electronics" selected={selected} onClick={() => {selectedOption(5,true)}} />
        </div>
        <div className='sidebar_bottom'  >
        <SidebarOptions Icon={LanguageIcon} title='Laguages' />
        <SidebarOptions Icon={SettingsIcon} title='Settings' />
          <div onClick={closeModal}>
          <SidebarOptions Icon={LogoutIcon} title='Logout'  />
          </div>
        </div>
    </div>
  )
}

export default Sidebar  