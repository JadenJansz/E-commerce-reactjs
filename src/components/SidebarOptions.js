import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { handleCategory } from '../features/categorySlice'

import './SidebarOptions.css'

const SidebarOptions = ({ Icon, title, category, selected }) => {

  const dispatch = useDispatch(); 
  const theme = useSelector(state => state.theme)
  
  return (
    <div className='sidebarOptions' id={theme} onClick={() => {dispatch(handleCategory(category))} } >
        <p>{title}</p>
        <Icon />
    </div>
  )
}

export default SidebarOptions  