import React, { useState } from 'react'
import styles from './ImageModal.module.css'
export default function ImageModal({images, activeImage, setActiveImage}) {    

    const handleNext = (number) =>{        
       const image = document.querySelector("#set-image")
       const index = images.indexOf(images.filter(img=>img.secure_url === image.src)[0])
       if(number === 1 && index >= images.length -1){
        console.log("begining")
        image.src=images[0].secure_url       
       }else if(number === -1 && index <= 0){
        console.log("end")
        image.src=images[images.length - 1].secure_url
       }else{
        console.log("next")
        image.src = images[index+number].secure_url
       }       
    }
    const close = ()=>{
        setActiveImage(null)
    }
    
  return (
    <div id="modal" className={activeImage ? styles['image-modal']:styles['hidden']}>
       
       <div className={styles['image-container']}>
       <div className={styles['close']}><p onClick={()=>close()}>X</p></div>
            <div className={styles['arrow']}  onClick={()=>handleNext(-1)}>{"<"}</div>
            <div className={styles['modal-image']}><img id="set-image" src={activeImage} alt="horse" /></div>
            <div className={styles['arrow']} onClick={()=>handleNext(1)}>{">"}</div>
        </div>
    </div>
  )
}
