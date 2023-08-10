import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectShowNavbar, toggle } from './navbarSlice'
import brandImage from '../../static/images/ddc.png'
import {  selectUser } from '../../features/user/userSlice'
import { userLogout } from '../../features/user/userApi'
export default function Navbar() {
 
  const showNavbar = useSelector(selectShowNavbar)
  const dispatch = useDispatch();  
  const activeStyle = ({isActive})=>isActive ? `${styles['active']} ${styles['nav-link']}` : styles['nav-link']
  const user = useSelector(selectUser)
  
  return (
    <div className={`${styles['navbar']} `}>
        <div className={styles['brand']}>
            <img src={brandImage} alt="brand"/>
        </div>        
        <ul className={`${showNavbar ? styles.show : ''}`}>
            <li><NavLink className={activeStyle} to="/" onClick={()=>{dispatch(toggle())}}>Home</NavLink></li> 
            <li><NavLink className={activeStyle} to="/cattle" onClick={()=>{dispatch(toggle())}}>Cattle</NavLink></li>           
            <li><NavLink className={activeStyle} to="/horses" onClick={()=>{dispatch(toggle())}}>Horses</NavLink></li>   
            {user.role === 'admin' && <li><NavLink className={activeStyle} to="/admin" onClick={()=>{dispatch(toggle())}}>Admin</NavLink></li>}         
            {!user.username &&<li><NavLink className={activeStyle} to="/login" onClick={()=>{dispatch(toggle())}}>Sign In</NavLink></li>}
            {user.username && <li><NavLink className={styles['nav-link']} onClick={()=>{dispatch(userLogout())}}>Sign Out</NavLink></li>}
        </ul>
        <div className={styles['hamburger']} onClick={()=>dispatch(toggle())}>
          <div className={showNavbar ?styles['top-rotate']: ''}></div>
          <div className={showNavbar ?styles['hide']: ''}></div>
          <div className={showNavbar ?styles['bottom-rotate']:''}></div>
        </div>         
    </div>
  )
}
