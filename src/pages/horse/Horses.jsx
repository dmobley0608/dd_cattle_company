import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadHorses, selectAllHorses, selectIsLoading } from '../../features/horses/horsesSlice'
import HorseCard from './components/horseCard/HorseCard'
import CardContainer from '../../components/cardContainer/CardContainer'
import Loading from '../../components/loading/Loading'


export default function Horses() {
  let isLoading = useSelector(selectIsLoading)
  const horses = useSelector(selectAllHorses)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHorses());
  }, []);

  return (
    <div >
      {isLoading ?
        <Loading />
        :
        <CardContainer>{Object.values(horses).map(horse =>
         
            <HorseCard key={horse.id} horse={horse} />
          
        )}
        </CardContainer>

      }

    </div>
  )
}
