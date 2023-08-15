import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadHorses, selectHorse } from '../../../features/horses/horsesSlice'
import {useFormik } from 'formik'
import { updateHorseById } from '../../../features/horses/horsesAPI'
import { selectUser } from '../../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { TextArea, TextField } from '../../../components/forms/inputs'


export default function HorseForm() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const horse = useSelector(selectHorse)
    const nav = useNavigate()
    
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {        
        setLoading(true)
        try {
            const res = await updateHorseById(horse.id, e, user.token)
            if (res.status === 200) {
                alert(`${horse.name} updated successfully`)
                dispatch(loadHorses())

            } else {
                alert("Error updating Horse")
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert(`${err.response.data}\n PLEASE LOGIN TO REFRESH YOUR TOKEN`)
                nav("/login")
            }            
        }
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: horse,
        onSubmit: handleSubmit,
        enableReinitialize: true
    });

   useEffect(()=>{

   },[horse])

    return (

        <form onSubmit={formik.handleSubmit}>
            <div className='row'>
                <TextField name="name" label="Name" type="text" InputLabelProps={{shrink:true}}  value={formik.values.name || ''}  onChange={formik.handleChange} />
                <TextField name="birth_date" label="Birth Date" type="date" InputLabelProps={{shrink:true}}  value={formik.values.birth_date || ''}  onChange={formik.handleChange} />
            </div>

            <div className='row'>                
                <TextField name="color" label="Color" type="text"  value={ formik.values.color || ''} onChange={formik.handleChange}  />
                <TextField name="breed" label="Breed" type="text"  value={formik.values.breed ||''} onChange={formik.handleChange}  />
                <TextField name="sex" label="Sex" type="text"  value={formik.values.sex || ''} onChange={formik.handleChange}  />
            </div>
           



            <div className='row'>
               
                <TextField name="hma" label="HMA" type="text"  value={formik.values.hma || ''} onChange={formik.handleChange}  />
                <TextField name="brand" label="Brand"  value={formik.values.brand|| ''} onChange={formik.handleChange} type="text"  />
            </div>


            <TextArea name="bio" label="Biography"   value={formik.values.bio ||''} onChange={formik.handleChange} />
            <LoadingButton type="submit" loading={loading} loadingPosition="start" startIcon={<SaveIcon />} variant="contained" sx={{ color: 'black' }} >Save </LoadingButton>




        </form>


    )
}
