import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoading } from './horsesSlice'
import { useParams } from 'react-router-dom'
import styles from './Horse.module.css'
import ImageModal from '../../components/imageModal/ImageModal'

import Loading from '../../components/loading/Loading'

export default function Horse() {
  let isLoading = useSelector(selectIsLoading)
  const { horseName } = useParams('horseName')
  const horse = useSelector(state => state.horses.horses[horseName])
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [activeImage, setActiveImage] = useState("")




  //Random Image 
  const getRandomImage = () => {
    if (images.length >= 1) {
      const randomNumber = Math.floor(Math.random() * images.length)
      return <img className={styles['main-horse-image']} src={`${images[randomNumber].url}`} alt="horse" />
    }
    return <h3>Image Coming Soon</h3>
  }

  //Image Click
  const imageClick = (image) => {
    setActiveImage(image)
    document.querySelector('#modal').classList.add('visible')
  }

  useEffect(() => {
    if (!isLoading && horse) {
      setImages(horse.Media.filter(media => media.format !== "mp4"))
      setVideos(horse.Media.filter(media => media.format === "mp4"))
    }

    console.log(horse)
  }, [isLoading, horse])





  return (
    <div className={styles['horse-page'] + " fade-in"}>
      {!isLoading && horse ?
        <div className={styles['horse-container']}>
          {/* General Information */}
          <div className={styles['two-col']}>
            <div className={styles['col']}>
              <h1>{horse.name}</h1>
              {horse.brand > 0 && <p>Brand: {horse.brand}</p>}
              {horse.hma && <p>HMA: {horse.hma}</p>}
              {horse.hma && <p>Breed: {horse.breed}</p>}
              <p>Color: {horse.color}</p>
              <p>Sex: {horse.sex}</p>
              <p>Age: {new Date().getFullYear() - horse.birth_date.split('-')[0]}</p>
              <p>MEDIA</p>
              <ul className={styles['mini-nav']}>
                <li><a href="#images">Images</a></li>
                <li><a href="#videos">Videos</a></li>
              </ul>
            </div>
            <div className={styles['col']}>
              {getRandomImage()}
            </div>

          </div>

          <hr />
          {/* Bio */}
          <div>
            <h2>A Little About {horse.name}</h2>
            <p>{horse.bio}</p>
          </div>
          <hr />
          {/* Gallery */}
          {!isLoading && horse ?
            <div className={styles['gallery-container']}>
              <h2>Gallery For {horse.name}</h2>
              <h3>Images</h3>
              <div id="images" className={styles['gallery']}>

                {images.map(image =>
                  <div className={styles['imgContainer']}>
                    <img key={image.asset_id} src={`${image.thumb}`} onClick={() => { imageClick(image) }} alt="horse" />
                  </div>
                )}
              </div>
              <h3>Videos</h3>
              <div id="videos" className={styles["gallery"]}>
                {videos.map(vid =>
                  <video controls key={vid.asset_id} width="350px">
                    <source src={`${vid.url}`} />
                  </video>)}
              </div>
              <ImageModal images={images} activeImage={activeImage} setActiveImage={setActiveImage} />
            </div>
            :
            <h3>Media Coming Soon...</h3>
          }

          <hr />
          {/* Medical Recors */}
          <div className={styles['records']}>
            <h2>Medical Records For {horse.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight</th>
                  <th>Height</th>
                  <th>Wormed</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {horse.MedicalRecords.map(record =>
                  <tr key={record.id}>

                    <td>{new Date(record.date).toDateString()}</td>
                    <td>{record.weight ? record.weight + "lbs" : ""}</td>
                    <td>{record.height ? record.height + " hands" : ""}</td>
                    <td>{record.wormed ? "X" : ""}</td>
                    <td>{record.description ? record.description : ""}</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
        : <Loading />

      }

    </div>


  )



}
