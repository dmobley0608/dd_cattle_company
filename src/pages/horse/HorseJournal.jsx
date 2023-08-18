import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { getHorseByName,  selectHorse, selectIsLoading } from "../../features/horses/horsesSlice";
import JournalCard from './components/journalCard/JournalCard'
import Loading from '../../components/loading/Loading'

export default function Journal() {
    const isLoading = useSelector(selectIsLoading)
    const { horseName } = useParams("horseName")
    const horse = useSelector(selectHorse)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHorseByName(horseName))
    }, [])
    return (
        <>
            <h1>Riding Journal For {horse.name}</h1>
            {isLoading ? <Loading /> :

                horse.Journal.map(journal => (<JournalCard journal={journal} />))
            }
        </>
    )
}