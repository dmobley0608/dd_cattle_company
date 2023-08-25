import React, { useState } from 'react';
import {  useSelector } from "react-redux";

import {  selectHorse, selectIsLoading } from "../../features/horses/horsesSlice";
import JournalCard from './components/journalCard/JournalCard'
import Loading from '../../components/loading/Loading'
import styles from './Horse.module.css'
import CardContainer from '../../components/cardContainer/CardContainer';
import { selectUser } from '../../features/user/userSlice';
import { Button } from '@mui/material';
import JournalFormModal from './components/journalFormModal/JournalFormModal';
export default function Journal() {
    const isLoading = useSelector(selectIsLoading)
    const horse = useSelector(selectHorse)
    const user = useSelector(selectUser)
    const [showForm, setShowForm] = useState(false)


    return (
        <div className={'animate__animated animate__fadeIn ' + styles['journal']}>
            <div className='flex'>
                <h1 >Riding Journal For {horse.name}</h1>
                {user.role && <Button  variant='contained' style={{marginLeft:'1em'}} onClick={()=>setShowForm(!showForm)}>+ Add Ride</Button>}
            </div>

            {isLoading ? <Loading /> :
                <CardContainer>
                    {horse.RidingLogs.map(journal => (<JournalCard key={journal.id} journal={journal} horse={horse}/>))}
                </CardContainer>
            }
           {showForm && <JournalFormModal horse={horse} setShow={setShowForm}/>}
        </div>
    )
}