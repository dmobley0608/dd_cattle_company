import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { getHorseByName, selectHorse, selectIsLoading } from "../../features/horses/horsesSlice";
import JournalCard from './components/journalCard/JournalCard'
import Loading from '../../components/loading/Loading'
import styles from './Horse.module.css'
import CardContainer from '../../components/cardContainer/CardContainer';
export default function Journal() {
    const isLoading = useSelector(selectIsLoading)
    const horse = useSelector(selectHorse)



    return (
        <div className={'animate__animated animate__fadeIn '+styles['journal']}>
            <h1>Riding Journal For {horse.name}</h1>
            {isLoading ? <Loading /> :
                <CardContainer>   
                     {horse.RidingLogs.map(journal => (<JournalCard key={journal.id} journal={journal} />))}
                </CardContainer>
            }

        </div>
    )
}