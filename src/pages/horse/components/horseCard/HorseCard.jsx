import React, { useEffect, useState } from 'react'
import styles from './HorseCard.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseByName, selectIsLoading } from '../../../../features/horses/horsesSlice'
import { ZoomInEntranceAnimation } from '../../../../components/animations/Animations'

export default function HorseCard({ horse }) {
  const [image, setImage] = useState(null)
  const [weight, setWeight] = useState(null)
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const exit = (e, horse) => {
    const selectedCard = document.querySelector(`#${horse.name}`)
    selectedCard.classList.remove('animate__animated', 'animate__zoomIn')
    selectedCard.classList.add('animate__animated', 'animate__hinge')
    setTimeout(()=>{
      document.querySelector('#card-container')
      .classList.add('animate__animated','animate__fadeOut')
    },1800)
    setTimeout(()=>{
      dispatch(getHorseByName(horse.name))
      nav(`${horse.name}/about`)
    },2500)
  }


  const getHorseWeight = () =>{
      const weightRecords = horse.MedicalRecords.filter(rec=> rec.weight > 0)
      weightRecords.sort((a,b)=> a.id > b.id)    
      return weightRecords[0] ?  ` ${weightRecords[0].weight} lbs` : null
  }


//Display random image
useEffect(() => {
  setWeight(getHorseWeight())
  if (!isLoading && horse.Media.length > 0) {
    let randNum = Math.floor(Math.random() * horse.Media.length)
    setImage(horse.Media[randNum].thumbnail)

  }
}, [isLoading, horse.Media, weight])


return (
  <ZoomInEntranceAnimation id={horse.name} styles={`${styles['horse-card']} card`  } >
    <NavLink onClick={(e) => exit(e, horse)}>
      <div className={styles['card-top']}>
        {image ? <img src={image} alt="horseImg" /> : <h3>Image Coming Soon</h3>}
      </div>
      <div className={styles['card-details']}>
        <h2 className={styles['card-name']}>{horse.name}</h2>
        <h3>Breed: {horse.breed}</h3>
        {horse.hma && <h3>HMA: {horse.hma}</h3>}
        <h3>Sex: {horse.sex}</h3>
        <h3>Foal Year: {horse.birth_date.split('-')[0]}</h3>
        <h3>Age: {new Date().getFullYear() - horse.birth_date.split('-')[0]}</h3>
        {weight
         ? <h3>Weight:{weight}</h3> : ''
        }
        
      </div>
    </NavLink>
  </ZoomInEntranceAnimation>


)
}
