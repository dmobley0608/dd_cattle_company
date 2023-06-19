import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseMediaById, getHorseMedicalRecordsById, selectImageLoading, selectIsLoading } from './horsesSlice'
import { useParams } from 'react-router-dom'
import styles from './Horse.module.css'
import ImageModal from '../../components/imageModal/ImageModal'
import ErrorHandler from '../../components/error-handler/ErrorHandler'

export default function Horse() {
  const dispatch = useDispatch()
  let isLoading = useSelector(selectIsLoading)
  const imagesLoading = useSelector(selectImageLoading)
  const { horseName } = useParams('horseName')
  const horse = useSelector(horses => horses.horses.horses[horseName])

  const [images, setImages] = useState(null)
  const [videos, setVideos] = useState(null)
  const [activeImage, setActiveImage] = useState("")
  const thumbnailUrl = 'https://res.cloudinary.com/dmobley0608/image/upload/c_thumb,w_400';
  const baseUrl = 'https://res.cloudinary.com/dmobley0608'



  //Random Image 
  const getRandomImage = () => {
    if (images.length >= 1) {
      const randomNumber = Math.floor(Math.random() * images.length)
      return <img className={styles['main-horse-image']} src={`${thumbnailUrl}/${images[randomNumber].public_id}.${images[randomNumber].format}`} alt="horse" />    
    }
    return <h3>Image Coming Soon</h3>
  }

  //Image Click
  const imageClick = (image) => {
    setActiveImage(image)
    document.querySelector('#modal').classList.add('visible')
  }

  //Load Medical Records & Images
  useEffect(() => {
    if (!isLoading && horse) {
      dispatch(getHorseMedicalRecordsById(horse.id))
      dispatch(getHorseMediaById(horse.id))     
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoading])

  //Set Images
  useEffect(() => {
    if (!imagesLoading && horse.images.length > 0) {
      let imgs = horse.images.filter(image => image.format !== "mp4")
      let vids = horse.images.filter(image => image.format === "mp4")
      setImages(imgs.sort((a, b) => a.filename - b.filename))
      setVideos(vids.sort((a, b) => a.created_at - b.created_at))
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoading])

  //Catch horse undefined
  if (!horse) return <ErrorHandler message={"Horse Not Found"} />

  return (
    <div className={styles['horse-page'] + " fade-in"}>
      {isLoading ? <h1>Loading...</h1> :
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
              <p>Age: {new Date().getFullYear() - horse.birthYear}</p>
              <p>MEDIA</p>
              <ul className={styles['mini-nav']}>
                <li><a href="#images">Images</a></li>
                <li><a href="#videos">Videos</a></li>
              </ul>
            </div>
            <div className={styles['col']}>
              {!imagesLoading && images ? getRandomImage() : "Image Coming Soon"}
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
          {!imagesLoading && images ?
            <div  className={styles['gallery-container']}>
              <h2>Gallery For {horse.name}</h2>
              <h3>Images</h3>
              <div id="images" className={styles['gallery']}>
                {images.map(image => <img  key={image.asset_id} src={`${thumbnailUrl}/${image.public_id}.${image.format}`} alt={image.asset_id}
                  onClick={() => { imageClick(image) }} />)}
              </div>
              <h3>Videos</h3>
              <div id="videos" className={styles["gallery"]}>
                {videos.map(vid =>
                  <video controls key={vid.asset_id} width="350px">
                    <source src={`${baseUrl}/video/upload/${vid.public_id}.${vid.format}`} />
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
                {horse.records.map(record =>
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


      }
      
    </div>


  )



}
