import React, { useEffect, useState } from 'react'

import { deleteImage, uploadImage } from '../../features/horses/horsesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { clearHorse, getHorseById, getHorseByName, selectHorse, selectIsLoading } from '../../features/horses/horsesSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import { TextField } from '@mui/material';

export default function AdminMedia({ user, setHorse }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading)
  const horse = useSelector(selectHorse)



  const handleSubmit = async (e) => {
    e.preventDefault();

    await uploadImage(horse.id, horse.name, e.target, user.token)
      .then(async res => {
        if (res.status === 200) {          
          dispatch(getHorseByName(horse.name))
          alert("Upload Successful")
        } else {
          alert("Error Uploading")
        }
      })

  }

  const handleDelete = async (fileId) => {
    await deleteImage(fileId, user.token)    
    dispatch(getHorseByName(horse.name))
  }




  return (
    <div id="admin-media" >
      {isLoading ? "loading" :
        <form onSubmit={handleSubmit} encType="multipart/form-data" accept="image/png, image/jpg, video/mp4">
          <TextField type='file' name='media' multiple='multiple' required />
          <LoadingButton variant='contained' loading={isLoading} color='secondary' type='submit'><UploadIcon />Upload</LoadingButton>
        </form>
      }
      <div id='media-container' >
        {horse.Media.map(img =>
          <div className='media-card' key={img.fileId}>
            {img.fileType === "image" && <img src={img.thumbnail} alt="horse" />}
            {img.fileType !== "image" &&
              <video controls width='300px' height={200}>
                <source src={`${img.url}.mp4`} />
              </video>}
            <LoadingButton loading={isLoading} variant='contained' color='warning' type="submit" onClick={() => handleDelete(img.fileId)}>DELETE</LoadingButton>
          </div>

        )}
      </div>

    </div>
  )
}
