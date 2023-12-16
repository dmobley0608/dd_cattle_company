import React, { useEffect, useState } from 'react'
import ImageModal from '../../components/imageModal/ImageModal'
import styles from './Horse.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectHorse } from '../../features/horses/horsesSlice'


export default function HorseGallery() {  
  const { mediaType } = useParams('type')
  const horse = useSelector(selectHorse)
  const [media, setMedia] = useState([])
  const [activeImage, setActiveImage] = useState("")

  //Image Click
  const imageClick = (image) => {
    setActiveImage(image)
    document.querySelector('#modal').classList.add('visible')
  }

  useEffect(() => {
    if (mediaType === 'images') {
      setMedia(() => horse.Media.filter(img => img.fileType === 'image').sort((a,b)=>(b.id - a.id)))
      console.log(media)
    } else {
      setMedia(() => horse.Media.filter(img => img.fileType !== 'image').sort((a,b)=>(b.id - a.id)))
    }

  }, [mediaType, horse.Media])

  return (
    <div>  {/* Gallery */}      
      <div className={'animate__animated animate__fadeIn '+styles['gallery-container']}>
        <div id="images" className={styles['gallery']}>
          {media.length > 0 ?
            media.map(media =>
              media.fileType === "image"?
              <div key={media.fileId} className={styles['imgContainer']}>
                <img src={`${media.thumbnail}`} onClick={() => { imageClick(media) }} alt="horse" />
              </div>
              :
              <video key={media.fileId} width="320" height="240" controls>
                <source src={media.url}></source>
              </video>
            )
            :
            <h3>Media Coming Soon</h3>
          }
        </div>

        <ImageModal images={media} activeImage={activeImage} setActiveImage={setActiveImage} />
      </div>
    </div>
  )
}
