import React, { useCallback, useEffect, useState } from 'react'
import styles from './HorseCard.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseByName, selectIsLoading } from '../../../../features/horses/horsesSlice'
import { ZoomInEntranceAnimation } from '../../../../components/animations/Animations'

export default function HorseCard({ data }) {
  const [image, setImage] = useState(null)
  const [horse, setHorse] = useState({ ...data })
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()
  const nav = useNavigate()

  const exit = (e, horse) => {
    const selectedCard = document.querySelector(`#${horse.name}`)
    selectedCard.classList.remove('animate__animated', 'animate__zoomIn')
    selectedCard.classList.add('animate__animated', 'animate__hinge')
    setTimeout(() => {
      document.querySelector('#card-container')
        .classList.add('animate__animated', 'animate__fadeOut')
    }, 1800)
    setTimeout(() => {
      dispatch(getHorseByName(horse.name))
      nav(`${horse.name}/about`)
    }, 2500)
  }


  const getHorseWeight = useCallback(() => {
    const weightRecords = horse.MedicalRecords.filter(rec => rec.weight > 0)
    weightRecords.sort((a, b) => a.id > b.id)
    const weight = weightRecords[0] ? ` ${weightRecords[0].weight} lbs` : null
    setHorse(horse => ({ ...horse, weight: weight }))

  }, [horse.MedicalRecords])

  const getHorseHeight = useCallback(() => {
    const heightRecords = horse.MedicalRecords.filter(rec => rec.height > 0)
    heightRecords.sort((a, b) => a.id > b.id)
    const height = heightRecords[0] ? ` ${heightRecords[0].height} hands` : null
    setHorse(horse => ({ ...horse, height: height }))
  }, [horse.MedicalRecords])

  // Set Weight and Height
  useEffect(() => {
    getHorseHeight()
    getHorseWeight()
  }, [isLoading, getHorseHeight, getHorseWeight])


  //Display random image
  useEffect(() => {
    if (!isLoading && horse.Media.length > 0) {
      const images = horse.Media.filter(media=>media.fileType === "image")
      let randNum = Math.floor(Math.random() * images.length)
      setImage(images[randNum].thumbnail)
    }
  }, [isLoading, horse.Media])




  return (
    <ZoomInEntranceAnimation id={horse.name} styles={`${styles['horse-card']} card`} >
      <NavLink onClick={(e) => exit(e, horse)}>
        {horse ? <>
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
            {horse.height && <h3>Height: {horse.height}</h3>}
            {horse.weight && <h3>Weight:{horse.weight}</h3>}
          </div>
        </>
          :
          <h3>Loading</h3>
        }
      </NavLink>
    </ZoomInEntranceAnimation>


  )
}
