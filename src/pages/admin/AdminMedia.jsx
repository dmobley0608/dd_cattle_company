import React, { useEffect, useState } from 'react'

import { deleteImage, uploadImage } from '../../features/horses/horsesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getHorseById, selectHorse } from '../../features/horses/horsesSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import { TextField } from '@mui/material';

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

  const handleDelete = async (fileId) => {
    setLoading(true)
    await deleteImage(fileId, user.token)
    dispatch(getHorseById(horse.id))
    setLoading(false)
    
  }

  useEffect(() => {    
    setMedia(horse.Media)
  }, [horse])



  return (
    <div id="admin-media" >
      {loading ? "loading" :
        <form onSubmit={handleSubmit} encType="multipart/form-data" accept="image/png, image/jpg, video/mp4">
          <TextField type='file' name='media' multiple='multiple' required/>
          <LoadingButton variant='contained' loading={loading} color='secondary' type='submit'><UploadIcon/>Upload</LoadingButton>
        </form>
      }
      <div  id='media-container' >
        {horse.Media && media.map(img =>
          <div className='media-card' key={img.fileId}>
            {img.fileType === "image" && <img src={img.thumbnail} alt="horse" />}
            {img.fileType !== "image" &&
              <video controls width='300px' height={200}>
                <source src={`${img.url}.mp4`} />
              </video>}
            <LoadingButton loading={loading} variant='contained' color='warning' type="submit" onClick={() => handleDelete(img.fileId)}>DELETE</LoadingButton>
          </div>

        )}
      </div>

    </div>
  )
}
