
import React, { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import SideMenu from '../../components/admin/side-menu/SideMenu'
import HorseForm from '../../components/admin/HorseForm'
import AdminMedia from '../../components/admin/AdminMedia'
import AdminRecords from '../../components/admin/AdminRecords'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { loadHorses, selectHorse } from '../../features/horses/horsesSlice'



export default function Admin() {
    const horse = useSelector(selectHorse)
    const [activeScreen, setActiveScreen] = useState('horse')
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const activeStyle = (e, className)=> {
        const elements = document.querySelectorAll(className);          
        for(let element of elements){                        
         element.classList.remove('isActive')
        }
        e.target.classList.add('isActive')
      }

    useEffect(()=>{
        dispatch(loadHorses())
    },[])

    return (

        <div id={`${styles.admin}`} className={``}>            
            {/* Side Menu */}
            <SideMenu activeStyle={activeStyle} />
            {/* Horse Information */}
           
            <div className='w_100 center'>          
                {horse.name && <ul className={`${styles.topMenu}`}>
                    <li className='submenu' onClick={(e) => {setActiveScreen('horse'); activeStyle(e, '.submenu')}}>About</li>
                    <li className='submenu' onClick={(e) => {setActiveScreen('records');activeStyle(e, '.submenu')}}>Medical Records</li>
                    <li className='submenu' onClick={(e) => {setActiveScreen('media');activeStyle(e, '.submenu')}}>Media</li>
                </ul>}
                {activeScreen === 'horse' && <HorseForm  />}
                {activeScreen === 'media' && <AdminMedia user={user}/>}
                {activeScreen === 'records' && <AdminRecords user={user} />}
            </div>

        </div>
    )
}
