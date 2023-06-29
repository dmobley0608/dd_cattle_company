import React, { useEffect, useState } from 'react'
import { useFormik, Formik, Form, Field } from 'formik'
import { addMedicalRecord, updateMedicalRecord } from '../../features/horses/horsesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseById, selectHorse } from '../../features/horses/horsesSlice'
import { selectUser } from '../../features/user/userSlice'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { checkbox } from '../themes/themes'
import BackspaceIcon from '@mui/icons-material/Backspace'; 

export default function MedicalRecordForm({ record, setRecord }) {
    const horse = useSelector(selectHorse)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [initialValues, setInitialValues] = useState({})



    const handleSubmit = async (e) => {
        setLoading(true)
        if (e.height === 0) { e.height = null }
        if (e.weight === 0) { e.weight = null }
        if (record) {
            updateRecord(e)
        } else {

            await addMedicalRecord({ ...e, horse_id: horse.id }, user.token)
                .then(res => {
                    if (res.status === 201) {
                        alert('Record Successflly Added')
                        dispatch(getHorseById(horse.id))
                        setRecord(initialValues)
                    } else {
                        alert('Error Adding Record')
                    }
                })

        }
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: record ? record : {},
        onSubmit: handleSubmit,
        enableReinitialize: true

    })

    const updateRecord = async (e) => {
        await updateMedicalRecord(record.id, e, user.token)
            .then(res => {
                if (res.status === 200) {
                    alert('Record Successflly Updated')
                } else {
                    alert('Error Updating Record')
                }
            })
    }




    return (
        <div>
            <div className='flex pointer' onClick={() => { setRecord(() => null) }}><BackspaceIcon /> <h4>Clear Form</h4></div>


            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, minWidth: '30%' }} >
                        <DatePicker label="Date" type='date' value={record ? dayjs(formik.values.date) : null} onChange={() => formik.handleChange} />
                    </LocalizationProvider>
                    <TextField label="Description" name="description" value={record ? formik.values.description : null} type="text" sx={{ m: 1, minWidth: '30%' }}
                        defaultValue={record ? formik.values.description : " "} onChange={formik.handleChange} />
                </div>
                <div className='row'>
                    <TextField label="Weight" name="weight" type="number" sx={{ m: 1, minWidth: '30%' }}
                        value={record ? formik.values.weight : null} onChange={formik.handleChange} />
                    <TextField label="Height" name="height" type="float" sx={{ m: 1, minWidth: '30%' }}
                        value={record ? formik.values.height : null} onChange={formik.handleChange} />
                </div>
                <div className='row' >
                    <ThemeProvider theme={checkbox}>
                        <FormControlLabel control={<Switch name="wormed" checked={record ? formik.values.wormed : null} onChange={formik.handleChange} />} label="Wormed" />
                        <FormControlLabel control={<Switch name="coggins" checked={record ? formik.values.coggins : null} onChange={formik.handleChange} />} label="Coggins" />
                        <FormControlLabel control={<Switch name="rabies" checked={record ? formik.values.rabies : null} onChange={formik.handleChange} />} label="Rabies" />
                        <FormControlLabel control={<Switch name="yearly_vaccines" checked={record ? formik.values.yearly_vaccines : null}
                            onChange={formik.handleChange} />} label="Yearly Vaccines" />
                    </ThemeProvider>
                </div>


                <div className='row'>
                    <TextField label="Veterinarian" name="veterinarian" sx={{ m: 1, minWidth: '30%' }}
                        value={record ? formik.values.veterinarian : ""} onChange={formik.handleChange} type="text" />
                </div>


                <TextField label="Notes" name="notes" value={record ? formik.values.notes : ""} sx={{ m: 1, minWidth: '30%' }}
                    onChange={formik.handleChange} multiline rows={5} />
                <LoadingButton type="submit" loading={loading} loadingPosition="start" startIcon={<SaveIcon />} variant="contained" sx={{ color: 'black' }} >Save </LoadingButton>

            </form>

        </div>
    )
}
