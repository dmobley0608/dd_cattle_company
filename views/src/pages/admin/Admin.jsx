
import React, {  useState } from 'react'
import SideMenu from '../../components/admin/side-menu/SideMenu'
import HorseForm from '../../components/admin/HorseForm'
import AdminMedia from '../../components/admin/AdminMedia'
import AdminRecords from '../../components/admin/AdminRecords'
import {  useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import {  selectHorse } from '../../features/horses/horsesSlice'
import './admin.styles.css'
import { Tab, Tabs, ThemeProvider } from '@mui/material'
import { whiteBlack } from '../../components/themes/themes'



export default function Admin() {    
    const horse = useSelector(selectHorse)
    const [activeScreen, setActiveScreen] = useState('about')
    const user = useSelector(selectUser)


    const activeStyle = (e, className) => {
        const elements = document.querySelectorAll(className);
        for (let element of elements) {
            element.classList.remove('isActive')
        }
        e.target.classList.add('isActive')
    }

    const handleChange = (event, newValue) => {
        setActiveScreen(newValue);
    };

  

    return (

        <ThemeProvider theme={whiteBlack} >
            <div id="admin">
                 {/* Side Menu */}
            <SideMenu id="side-menu" activeStyle={activeStyle} />
            {/* Horse Information */}

            <div className='w_100 center'>
                {!horse.name && <h2>New Horse Form</h2>}
                {horse.name && <Tabs value={activeScreen} onChange={handleChange}  indicatorColor='primary'  sx={{mb:2, mt:5}}>
                    <Tab value='about' label="About" >About</Tab>
                    <Tab value='records' label="Records" >Medical Records</Tab>
                    <Tab value='media' label="Media">Media</Tab>
                </Tabs>}
                {activeScreen === 'about' && <HorseForm />}
                {activeScreen === 'media' && <AdminMedia user={user} />}
                {activeScreen === 'records' && <AdminRecords user={user} />}
            </div>
            </div>
           

        </ThemeProvider>
    )
}
