import React, { useEffect, useSelector, useDispatch } from 'react';
import { useParams } from 'react-router-dom'
import { loadHorse, selectIsLoading, selectHorse } from '../../features/horses/horsesSlice'
import JournalCard from './components/journalCard/JournalCard'
import Loading from '../../components/loading/Loading'

export default Journal = () => {
    const isLoading = useSelector(selectIsLoading)
    const { horseName } = useParams()
    const horse = useSelector(selectHorse)
    const dispath = useDispatch()

    useEffect(() => {
        dispatchEvent(loadHorse())
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