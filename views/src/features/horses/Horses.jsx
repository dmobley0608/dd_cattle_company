import React from 'react'
import {useSelector } from 'react-redux'
import { selectAllHorses, selectIsLoading } from './horsesSlice'
import HorseCard from '../../components/horseCard/HorseCard'
import CardContainer from '../../components/cardContainer/CardContainer'


export default function Horses() {

  
  const horses = useSelector(selectAllHorses)
  const isLoading = useSelector(selectIsLoading)

  


  return (
    <div >      
      {!isLoading ? <CardContainer>{Object.values(horses).map(horse => <HorseCard key={horse.id} horse={horse} />)}</CardContainer> : <h1>Loading ...</h1>}
    </div>
  )
}
