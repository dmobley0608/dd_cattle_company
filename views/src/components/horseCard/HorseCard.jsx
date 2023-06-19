import React, { useEffect, useState } from 'react'
import styles from './HorseCard.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseMediaById, selectIsLoading } from '../../features/horses/horsesSlice'
export default function HorseCard({ horse }) {
  const [image, setImage] = useState(null)
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading) {
      dispatch(getHorseMediaById(horse.id))
    }
  }, [dispatch, isLoading, horse.id])

  //Display random image
  useEffect(() => {    
      if (horse.images.length > 0) {
        let randNum = Math.floor(Math.random() * horse.images.length)
       let public_id =horse.images[randNum].public_id
        let url = `https://res.cloudinary.com/dmobley0608/image/upload/w_400/${public_id}.jpg`
        setImage(url)       
      }

    
  }, [horse.images])

  return (
    <Link className={styles['horse-card']} to={`/horses/${horse.name}`}>
      <div className={styles['card-top']}>
        {image ? <img src={image} alt="horseImg" /> : <h3>Image Coming Soon</h3>}
      </div>
      <div className={styles['card-details']}>
        <h2 className={styles['card-name']}>{horse.name}</h2>
        <h3>Breed: {horse.breed}</h3>
        {horse.hma && <h3>HMA: {horse.hma}</h3>}
        <h3>Sex: {horse.sex}</h3>
        <h3>Foal Year: {horse.birthYear}</h3>
      </div>
    </Link>
  )
}
