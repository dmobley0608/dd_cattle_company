import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseById, loadHorses, selectAllHorses, selectIsLoading } from '../../../features/horses/horsesSlice'
import styles from './SideMenu.module.css'


export default function SideMenu() {  
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const horses = useSelector(selectAllHorses)

  

  return (
    <div className={`${styles.horseMenu}`}>
      <select className={`${styles.dropdown}`} onChange={(e)=>dispatch(getHorseById(e.target.value))}>
        {Object.values(horses).map(horse => <option key={horse.id} value={horse.id}>{horse.name}</option>)}
      </select>
      <ul className={`${styles.sideMenu}`}>
        {Object.values(horses).map(horse => <li key={horse.id} onClick={() => {  dispatch(getHorseById(horse.id)) }}>{horse.name}</li>)}
      </ul>
    </div>
  )
}
