import React from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { getHorseById, getHorseByName, selectAllHorses, selectHorse, selectIsLoading } from '../../../../features/horses/horsesSlice'

import './SideMenu.styles.css'
import { Tab, Tabs } from '@mui/material'


export default function SideMenu({ activeStyle }) {
  

  const dispatch = useDispatch()
  const horses = useSelector(selectAllHorses)
  const horse = useSelector(selectHorse)




  return (
    <div >
      
     
          <select className="dropdown" onChange={(e) => dispatch(getHorseById(e.target.value))}>
            <option>Select Horse</option>
            {Object.values(horses).map(horse => <option key={horse.id} value={horse.name}>{horse.name}</option>)}
          </select>
          <Tabs id='side-menu' orientation='vertical' value={horse.name ? horse.name : null} onChange={(e, value) => { dispatch(getHorseByName(value)) }} indicatorColor='secondary' sx={{ m: 5, borderRight: 1, padding: 2 }}>
            <Tab className='menu' value={null} label="+ Add Horse" />
            {Object.values(horses).map(horse => <Tab className='menu' value={horse.name} key={horse.id} label={horse.name} />)}
          </Tabs>
       
    
    </div>
  )
}
