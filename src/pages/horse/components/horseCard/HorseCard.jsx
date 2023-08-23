import React, { useEffect, useState } from 'react'
import styles from './HorseCard.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseByName, selectIsLoading } from '../../../../features/horses/horsesSlice'
import { ZoomInEntranceAnimation } from '../../../../components/animations/Animations'

export default function HorseCard({ horse }) {
  const [image, setImage] = useState(null)
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()
  const exit=()=>{
    const cards = document.querySelectorAll('.horse-card')
    for(let card of cards){
     card.classList.add('animate__animated animate__hinge')
    }
  }

  //Display random image
  useEffect(() => {
    if (!isLoading && horse.Media.length > 0) {
      let randNum = Math.floor(Math.random() * horse.Media.length)
      setImage(horse.Media[randNum].thumbnail)

    }
  }, [isLoading, horse.Media])


  return (
    <ZoomInEntranceAnimation styles={styles['horse-card']}>
      <NavLink to={`${horse.name}/about`} onClick={()=>dispatch(getHorseByName(horse.name))}>
        <div className={styles['card-top']}>
          {image ? <img src={image} alt="horseImg" /> : <h3>Image Coming Soon</h3>}
        </div>
        <div className={styles['card-details']}>
          <h2 className={styles['card-name']}>{horse.name}</h2>
          <h3>Breed: {horse.breed}</h3>
          {horse.hma && <h3>HMA: {horse.hma}</h3>}
          <h3>Sex: {horse.sex}</h3>
          <h3>Foal Year: {horse.birth_date.split('-')[0]}</h3>
        </div>
      </NavLink>
    </ZoomInEntranceAnimation>


  )
}
