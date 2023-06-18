import React, { useEffect, useState } from 'react'
import styles from './HorseCard.module.css'
import { Link } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { getHorseImagesByName, selectIsLoading } from '../../features/horses/horsesSlice'
export default function HorseCard({horse}) {
  const [image, setImage] = useState(null)
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!isLoading) {      
        dispatch(getHorseImagesByName(horse.name))    
        
    }
  },[dispatch, isLoading, horse.name])

  useEffect(()=>{
    if(horse.images.images && horse.images.images.length >= 1){
      let images = horse.images.images.filter(img=>img.resource_type !== "video")        
      if(images.length > 0){
        let randNum = Math.floor(Math.random() * images.length )
        setImage(
          `https://res.cloudinary.com/dmobley0608/image/upload/c_thumb,w_400/double_d_ranch/${horse.name}/${images[randNum].filename}.${images[randNum].format}`
          )
      }     
    }     
  },[horse.images.images])

  return (
    <Link className={styles['horse-card']} to={`/horses/${horse.name}`}>
        <div className={styles['card-top']}>
            {image ?<img src={image} alt="horseImg" /> : <h3>Image Coming Soon</h3>}
        </div>
        <div className={styles['card-details']}>
            <h2 className={styles['card-name']}>{horse.name}</h2>
            <h3>Breed: {horse.breed}</h3>
            {horse.hma &&  <h3>HMA: {horse.hma}</h3>}
            <h3>Sex: {horse.sex}</h3>
            <h3>Foal Year: {horse.birthYear}</h3>
        </div>
    </Link>
  )
}
