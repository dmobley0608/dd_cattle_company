import React, { useEffect, useState } from 'react'
import styles from '../../pages/admin/Admin.module.css'
import { deleteImage, uploadImage } from '../../features/horses/horsesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getHorseById, selectHorse } from '../../features/horses/horsesSlice';



export default function AdminMedia({ user, setHorse }) {
  const [media, setMedia] = useState([])
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false) 
  const horse = useSelector(selectHorse)

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await uploadImage(horse.id, horse.name, e.target, user.token)
      .then(res => {
        if (res.status === 200) {
          dispatch(getHorseById(horse.id))
          alert("Upload Successful")
          
        }else{
          alert("Error Uploading")
        }
      })
    setLoading(false)
  }

  const handleDelete = async (asset_id) => {
    setLoading(true)
    await deleteImage(asset_id, user.token)
    dispatch(getHorseById(horse.id))
    setLoading(false)
    
  }

  useEffect(() => {    
    setMedia(horse.Media)
  }, [horse])



  return (
    <div id={`${styles.adminMedia}`} className='flex-column'>
      {loading ? "loading" :
        <form onSubmit={handleSubmit} encType="multipart/form-data" accept="image/png, image/jpg, video/mp4">
          <input type='file' name='media' multiple='multiple' />
          <button type='submit'>Upload</button>
        </form>
      }
      <div className='flex space-evenly'>


        {horse.Media && media.map(img =>
          <div className={`flex-column ${styles.mediaContainer}`} key={img.id}>
            {img.format !== "mp4" && <img src={img.thumb} alt="horse" />}
            {img.format === "mp4" &&
              <video controls width='300px' height={200}>
                <source src={`${img.url}.mp4`} />
              </video>}
            <button type="submit" onClick={() => handleDelete(img.asset_id)}>DELETE</button>
          </div>

        )}
      </div>

    </div>
  )
}
