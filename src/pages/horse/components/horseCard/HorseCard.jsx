import React, { useEffect, useState } from 'react'
import styles from './HorseCard.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../../../features/horses/horsesSlice'

export default function HorseCard({ horse }) {
  const [image, setImage] = useState(null)
  const isLoading = useSelector(selectIsLoading)

 

  //Display random image
  useEffect(() => {    
      if (!isLoading && horse.Media.length > 0) {
        let randNum = Math.floor(Math.random() * horse.Media.length)      
        setImage(horse.Media[randNum].thumbnail)
             
      }

    
  }, [isLoading, horse.Media])

  return (
    <Link className={styles['horse-card']} to={`/horses/${horse.name}/about`}>
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
    </Link>
  )
}
