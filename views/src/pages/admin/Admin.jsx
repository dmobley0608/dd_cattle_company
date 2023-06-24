
import React, { useState } from 'react'
import styles from './Admin.module.css'
import SideMenu from '../../components/admin/side-menu/SideMenu'
import HorseForm from '../../components/admin/HorseForm'
import AdminMedia from '../../components/admin/AdminMedia'
import AdminRecords from '../../components/admin/AdminRecords'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { selectHorse } from '../../features/horses/horsesSlice'



export default function Admin() {
    const horse = useSelector(selectHorse)
    const [activeScreen, setActiveScreen] = useState('horse')
    const user = useSelector(selectUser)

    return (

        <div id={`${styles.admin}`} className={`container`}>
            
            {/* Side Menu */}
            <SideMenu  />
            {/* Horse Information */}
           
            <div className='w_100 center'>
            <h2>{horse.name}</h2>
                {horse.name && <ul className={`${styles.topMenu}`}>
                    <li onClick={() => setActiveScreen('horse')}>About</li>
                    <li onClick={() => setActiveScreen('records')}>Medical Records</li>
                    <li onClick={() => setActiveScreen('media')}>Media</li>
                </ul>}
                {activeScreen === 'horse' && <HorseForm  />}
                {activeScreen === 'media' && <AdminMedia user={user}/>}
                {activeScreen === 'records' && <AdminRecords user={user} />}
            </div>

        </div>
    )
}
