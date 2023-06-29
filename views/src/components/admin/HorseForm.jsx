import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadHorses, selectHorse } from '../../features/horses/horsesSlice'
import {useFormik } from 'formik'
import { updateHorseById } from '../../features/horses/horsesAPI'
import { selectUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


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
        initialValues: horse ? horse : {name:""},
        onSubmit: handleSubmit,
        enableReinitialize: true
    });

   

    return (

        <form onSubmit={formik.handleSubmit}>
            <div className='row'>
                <TextField name="name" label="Name" type="text" value={horse.name ? formik.values.name : null} onChange={formik.handleChange} sx={{ m: 1, minWidth: '30%' }} />
                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, minWidth: '30%' }}>
                    <DatePicker label="Date of Birth" value={horse.birth_date ? dayjs(formik.values.birth_date) : null} onChange={()=>formik.handleChange}  />
                </LocalizationProvider>
            </div>

            <div className='row'>                
                <TextField name="color" label="Color" type="text"  value={horse.color ? formik.values.color : null} onChange={formik.handleChange} sx={{ m: 1, minWidth: '30%' }} />
                <TextField name="breed" label="Breed" type="text"  value={horse.breed ? formik.values.breed : null} onChange={formik.handleChange} sx={{ m: 1, minWidth: '30%' }} />
                <TextField name="sex" label="Sex" type="text"  value={horse.sex ? formik.values.sex : null} onChange={formik.handleChange} sx={{ m: 1, minWidth: '30%' }} />
            </div>
           



            <div className='row'>
               
                <TextField name="hma" label="HMA" type="text"  value={horse.hma ? formik.values.hma : null} onChange={formik.handleChange} sx={{ m: 1, minWidth: '30%' }} />
                <TextField name="brand" label="Brand"  value={horse.brand ? formik.values.brand: null} onChange={formik.handleChange} type="text" sx={{ m: 1, minWidth: '30%' }} />
            </div>


            <TextField name="bio" label="Biography"  value={horse.bio ? formik.values.bio : null} onChange={formik.handleChange} sx={{ m: 1, minWidth: '30%' }} multiline rows={5} />
            <LoadingButton type="submit" loading={loading} loadingPosition="start" startIcon={<SaveIcon />} variant="contained" sx={{ color: 'black' }} >Save </LoadingButton>




        </form>


    )
}
