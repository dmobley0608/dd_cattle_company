import React, { useCallback, useEffect, useState } from "react";
import styles from './Horse.module.css'
import { useSelector } from "react-redux";
import { selectHorse } from "../../features/horses/horsesSlice";


export default function AboutHorse() {
  const horse = useSelector(selectHorse)
  const [image, setImage] = useState(null)
  const [weight, setWeight] = useState(null)
  const [height, setHeight] = useState(null)
  //Random Image 
  const getRandomImage = useCallback(() => {
    let images = horse.Media.filter(img => img.fileType === 'image')
    if (images.length >= 1) {
      const randomNumber = Math.floor(Math.random() * images.length)
      return <img className={styles['main-horse-image']} src={`${images[randomNumber].url}`} alt="horse" />
    }
    return <h3>Image Coming Soon</h3>
  }, [horse.Media])

  // Weight and Height
  const getHorseWeight = useCallback(() => {
    const weightRecords = horse.MedicalRecords.filter(rec => rec.weight > 0)
    weightRecords.sort((a, b) => a.id > b.id)
    const weight = weightRecords[0] ? ` ${weightRecords[0].weight} lbs` : null
    setWeight(weight)

  }, [horse.MedicalRecords])

  const getHorseHeight = useCallback(() => {
    const heightRecords = horse.MedicalRecords.filter(rec => rec.height > 0)
    heightRecords.sort((a, b) => a.id > b.id)
    const height = heightRecords[0] ? ` ${heightRecords[0].height} hands` : null
    setHeight(height)
  }, [horse.MedicalRecords])


  useEffect(() => {
    setImage(getRandomImage())
    getHorseWeight()
    getHorseHeight()
  }, [getRandomImage, getHorseHeight, getHorseWeight])


  return (
    <div className={'animate__animated animate__fadeIn ' + styles['about']}>
      <h1>{horse.name}</h1>

      {/* General Information */}
      <div className={styles["two-col"]}>
        <div className={`${styles["col"]} text-start`}>
          {horse.brand > 0 && <p>Brand: {horse.brand}</p>}
          {horse.hma && <p>HMA: {horse.hma}</p>}
          {horse.hma && <p>Breed: {horse.breed}</p>}
          <p>Color: {horse.color}</p>
          <p>Sex: {horse.sex}</p>
          <p>Age: {!horse.birth_date ? "Retrieving Birth Date" :
            new Date().getFullYear() - horse.birth_date.split("-")[0]
          }
          </p>
          {height && <p>Height: {height}</p>}
          {weight && <p>Weight: {weight}</p>}          
        </div>
        <div className={styles["col"]}>{image} </div>
      </div>
      <hr /> {/* Bio */}
      <div>
        <h2>A Little About {horse.name}</h2>
        <p>{horse.bio}</p>
      </div>
      <hr />
    </div>
  );
}
