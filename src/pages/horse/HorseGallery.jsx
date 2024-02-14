import React, { useEffect, useState } from 'react'
import ImageModal from '../../components/imageModal/ImageModal'
import styles from './Horse.module.css'

export default function HorseGallery({ horse }) {
  const [activeImage, setActiveImage] = useState("")

  //Image Click
  const imageClick = (image) => {
    setActiveImage(image)
    document.querySelector('#modal').classList.add('visible')
  }


  return (
    <div>  {/* Gallery */}
      <div className={'animate__animated animate__fadeIn ' + styles['gallery-container']}>
        <div id="images" className={styles['gallery']}>
          {horse.Media.length > 0 ?
            horse.Media.map(media =>
              media.fileType === "image" ?
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

        <ImageModal images={horse.Media} activeImage={activeImage} setActiveImage={setActiveImage} />
      </div>
    </div>
  )
}
