import React from "react";
import styles from './Horse.module.css'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export default function AboutHorse() {
    const { horseName } = useParams('horseName')
    const horse = useSelector(state => state.horses.horses[horseName])

    
  //Random Image 
  const getRandomImage = () => {
    let images = horse.Media.filter(img=>img.fileType === 'image')
    if (images.length >= 1) {
      const randomNumber = Math.floor(Math.random() * images.length)
      return <img className={styles['main-horse-image']} src={`${images[randomNumber].url}`} alt="horse" />
    }
    return <h3>Image Coming Soon</h3>
  }

  return (
    <div className={styles['about']}>
         <h1>{horse.name}</h1>
     
      {/* General Information */}
      <div className={styles["two-col"]}>
        <div className={`${styles["col"]} text-start`}>         
          {horse.brand > 0 && <p>Brand: {horse.brand}</p>}
          {horse.hma && <p>HMA: {horse.hma}</p>}
          {horse.hma && <p>Breed: {horse.breed}</p>}
          <p>Color: {horse.color}</p>
          <p>Sex: {horse.sex}</p>          
          <p>
            Age: {new Date().getFullYear() - horse.birth_date.split("-")[0]}{" "}
          </p>         
        </div>
        <div className={styles["col"]}>{getRandomImage()} </div>
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
