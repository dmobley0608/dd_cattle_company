import React from 'react'
import {useSelector } from 'react-redux'
import { selectAllHorses, selectIsLoading} from '../../features/horses/horsesSlice'
import HorseCard from './components/horseCard/HorseCard'
import CardContainer from '../../components/cardContainer/CardContainer'
import Loading from '../../components/loading/Loading'

export default function Horses() {

  
  const horses = useSelector(selectAllHorses)
  let isLoading = useSelector(selectIsLoading)

 
  return (
    <div >      
      {!isLoading ?  (
       <CardContainer>{Object.values(horses).map(horse => <HorseCard key={horse.id} horse={horse} />)}</CardContainer> 
      )
       : 
       (
      <Loading/>
    )}
    
    </div>
  )
}
