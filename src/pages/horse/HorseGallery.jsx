import React, { useEffect, useState } from 'react'
import ImageModal from '../../components/imageModal/ImageModal'
import styles from './Horse.module.css'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'


export default function HorseGallery() {
  const { horseName } = useParams('horseName')
  const { mediaType } = useParams('type')
  const horse = useSelector(state => state.horses.horses[horseName])
  const [media, setMedia] = useState([])

  const [activeImage, setActiveImage] = useState("")

  //Image Click
  const imageClick = (image) => {
    setActiveImage(image)
    document.querySelector('#modal').classList.add('visible')
  }

  useEffect(() => {
    if (mediaType === 'images') {
      setMedia(() => horse.Media.filter(img => img.fileType === 'image'))
    } else {
      setMedia(() => horse.Media.filter(img => img.fileType !== 'image'))
    }

  }, [mediaType, horse.Media])

  return (
    <div>  {/* Gallery */}      
      <div className={styles['gallery-container']}>
        <div id="images" className={styles['gallery']}>
          {media.length > 0 ?
            media.map(media =>
              media.fileType === "image"?
              <div key={media.fileId} className={styles['imgContainer']}>
                <img src={`${media.thumbnail}`} onClick={() => { imageClick(media) }} alt="horse" />
              </div>
              :
              <video width="320" height="240" controls>
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
