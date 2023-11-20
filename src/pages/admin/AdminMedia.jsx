import React from 'react'

import { uploadImage } from '../../features/horses/horsesAPI';
import {  useDispatch, useSelector } from 'react-redux';
import { selectHorse, toggleIsLoading} from '../../features/horses/horsesSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import { TextField } from '@mui/material';
import { useAddMediaByHorseIdMutation, useDeleteMediaByIdMutation, useGetMediaByHorseIdQuery} from '../../features/horses/apiSlice';

export default function AdminMedia({ user, setHorse }) {
   const dispatch = useDispatch()
  const horse = useSelector(selectHorse)
  const [addMedia] = useAddMediaByHorseIdMutation()
  const {data, isLoading:imageLoad, error} = useGetMediaByHorseIdQuery(horse.id)  
 
  const [deleteMedia] = useDeleteMediaByIdMutation()
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();  
    dispatch(toggleIsLoading())
  
    // Axios image upload cleaner than redux toolkit 
    await uploadImage(horse.id, horse.name, e.target, user.token)
    .then(async res => {
      if (res.status === 200) {  
        //Trigger for redux toolkit to refresh cache *** empty request        
        addMedia({id:horse.id, name:horse.name, media:""})
        alert("Upload Successful")
      } else {
        alert("Error Uploading")
      }
    })
    dispatch(toggleIsLoading())
  }

  const handleDelete = async (fileId) => {  
      await deleteMedia(fileId, user.token)         
  }


  return (
    <div id="admin-media" >
      {error && "Error occurred"}
      {imageLoad ? "" :
        <form onSubmit={handleSubmit} encType="multipart/form-data" accept="image/png, image/jpg, video/mp4">
          <TextField type='file' name='media' multiple='multiple' required />
          <LoadingButton variant='contained' loading={imageLoad} color='secondary' type='submit'><UploadIcon />Upload</LoadingButton>
        </form>
      }
      <div id='media-container' >
        {(!imageLoad) ? data?.map(img =>
          <div className='media-card' key={img.fileId}>
            {img.fileType === "image" && <img src={img.thumbnail} alt="horse" />}
            {img.fileType !== "image" &&
              <video controls width='300px' height={200}>
                <source src={`${img.url}.mp4`} />
              </video>}
            <LoadingButton loading={imageLoad} variant='contained' color='warning' type="submit" onClick={() => handleDelete(img.fileId)}>DELETE</LoadingButton>
          </div>

        ):"Loading"}
      </div>

    </div>
  )
}
