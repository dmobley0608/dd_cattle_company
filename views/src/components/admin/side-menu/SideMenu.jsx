import React from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { getHorseById, selectAllHorses, selectHorse } from '../../../features/horses/horsesSlice'

import './SideMenu.styles.css'
import { Tab, Tabs } from '@mui/material'


import { ThemeProvider } from '@mui/material/styles';
import { whiteBlack } from '../../themes/themes'


export default function SideMenu({activeStyle}) {    

  
  const dispatch = useDispatch()  
  const horses = useSelector(selectAllHorses)
  const horse = useSelector(selectHorse)
 



  return (
    <div >
      <select className="dropdown" onChange={(e)=>dispatch(getHorseById(e.target.value))}>
        <option>Select Horse</option>
        {Object.values(horses).map(horse => <option key={horse.id} value={horse.id}>{horse.name}</option>)}
      </select>
      <Tabs id='side-menu' orientation='vertical' value={horse.id? horse.id : -1} onChange={(e, value)=>{dispatch(getHorseById(value))}}  indicatorColor='secondary'  sx={{m:5, borderRight:1, padding:2}}>
      <Tab className='menu' value={null}  label="+ Add Horse"  />
        {Object.values(horses).map(horse => <Tab className='menu' value={horse.id} key={horse.id} label={horse.name}  />)}
      </Tabs>
    </div>
  )
}
