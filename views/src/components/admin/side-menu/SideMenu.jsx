import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseById, loadHorses, selectAllHorses, selectIsLoading } from '../../../features/horses/horsesSlice'
import styles from './SideMenu.module.css'
import { NavLink } from 'react-router-dom'


export default function SideMenu({activeStyle}) {  
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const horses = useSelector(selectAllHorses)



  return (
    <div className={`${styles.horseMenu}`}>
      <select className={`${styles.dropdown}`} onChange={(e)=>dispatch(getHorseById(e.target.value))}>
        <option>Select Horse</option>
        {Object.values(horses).map(horse => <option key={horse.id} value={horse.id}>{horse.name}</option>)}
      </select>
      <ul className={`${styles.sideMenu}`}>
        {Object.values(horses).map(horse => <li className='menu'  key={horse.id}  onClick={(e) => {  dispatch(getHorseById(horse.id));activeStyle(e, '.menu') }}>{horse.name}</li>)}
      </ul>
    </div>
  )
}
