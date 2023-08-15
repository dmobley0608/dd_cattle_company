import React, { useEffect, useState } from 'react'
import ImageModal from '../../components/imageModal/ImageModal'
import styles from './Horse.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


export default function HorseGallery() {
  const { horseName } = useParams('horseName')
  const horse = useSelector(state => state.horses.horses[horseName])
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [activeImage, setActiveImage] = useState("")

   //Image Click
   const imageClick = (image) => {
    setActiveImage(image)
    document.querySelector('#modal').classList.add('visible')
  }

  useEffect(()=>{
    setImages(()=>horse.Media.filter(img=>img.fileType === 'image'))
    setVideos(()=>horse.Media.filter(vid=>vid.fileType !== 'image'))
  },[horse])

  return (
    <div>  {/* Gallery */}
    
      <div className={styles['gallery-container']}>       
        <div id="images" className={styles['gallery']}>
          {images.map(image =>
            <div key={image.fileId} className={styles['imgContainer']}>
              <img  src={`${image.thumbnail}`} onClick={() => { imageClick(image) }} alt="horse" />
            </div>
          )}
        </div>
        
        <div id="videos" className={styles["gallery"]}>
          {videos.map(vid =>
            <video controls key={vid.fileId} width="350px">
              <source src={`${vid.url}`} />
            </video>)}
        </div>
        <ImageModal images={images} activeImage={activeImage} setActiveImage={setActiveImage} />
      </div>
   </div>
  )
}
