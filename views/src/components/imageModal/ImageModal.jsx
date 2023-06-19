import React, { useEffect, useState } from 'react'
import styles from './ImageModal.module.css'
export default function ImageModal({images, activeImage, setActiveImage}) {    
    const [index, setIndex] = useState(0)
    const image = document.querySelector("#set-image")
    const baseUrl = 'https://res.cloudinary.com/dmobley0608/image/upload'   

   
    const handleNext = (number) =>{  
      let index = images.indexOf(activeImage)
      if(index === 0 && number === -1) {index = images.length}
      if(index >= images.length-1 && number === 1) {index = -1}
      setActiveImage(images[index + number])
    }
    const close = ()=>{     
        setActiveImage(null)
    }

    
    
  return (
    <div id="modal" className={activeImage ? styles['image-modal']:styles['hidden']}>
       
       <div className={styles['image-container']}>
       <div className={styles['close']}><p onClick={()=>close()}>X</p></div>
            <div className={styles['arrow']}  onClick={()=>handleNext(-1)}>{"<"}</div>
            {activeImage && <div className={styles['modal-image']}><img id="set-image" src={`${baseUrl}/${activeImage.public_id}`} alt="horse" /></div>}
            <div className={styles['arrow']} onClick={()=>handleNext(1)}>{">"}</div>
        </div>
    </div>
  )
}
