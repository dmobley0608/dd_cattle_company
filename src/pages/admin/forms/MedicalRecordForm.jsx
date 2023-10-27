import React, {  useState } from 'react'

import { useFormik } from 'formik'
import { addMedicalRecord, updateMedicalRecord } from '../../../features/horses/horsesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseByName, selectHorse } from '../../../features/horses/horsesSlice'
import { selectUser } from '../../../features/user/userSlice'
import BackspaceIcon from '@mui/icons-material/Backspace';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { CheckBoxSlider, TextArea, TextField } from '../../../components/forms/inputs'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material'



export default function MedicalRecordForm({ record, setRecord, setOpen }) {
    const horse = useSelector(selectHorse)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)




    const handleSubmit = async (e) => {
        setLoading(true)
        if (e.height === 0) { e.height = null }
        if (e.weight === 0) { e.weight = null }
       
            try{
                if (record) {
                    updateRecord(e)
                } else {
                await addMedicalRecord({ ...e, horse_id: horse.id }, user.token)
                .then(res => {

                    if (res.status === 201) {
                        alert('Record Successflly Added')
                        dispatch(getHorseByName(horse.name))
                        setRecord({})
                    } else {
                        alert('Error Adding Record')
                    }
                })
                setLoading(false)
            }


            }catch(err){
                alert("You do not have valid permision to make or alter records!")
                setLoading(false)
            }

           
        
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: record ? record : {},
        onSubmit: handleSubmit,
        enableReinitialize: true

    })

    const updateRecord = async (e) => {
        setLoading(true)
        try{
            await updateMedicalRecord(record.id, e, user.token)
            .then(res => {
                if (res.status === 200) {
                    alert('Record Successflly Updated')
                } else {
                    alert('Error Updating Record')
                }
            })

        }catch(err){
            alert("You do not have valid permision to make or alter records!")
            setLoading(false)
        }
       
        setLoading(false)
    }




    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='form' >
                <div className='flex j-between mb-1'>
                    <Button  variant='contained' onClick={() => { setRecord(() => null) }}><BackspaceIcon />Clear Form</Button>
                    <Button  variant='contained' onClick={() => { setOpen(true) }}><NewspaperIcon />View Records</Button>
                </div>

                <div className='row'>
                    <TextField type="date" label="Date" name="date" value={formik.values.date || ""} onChange={formik.handleChange} />
                    <TextField label="Description" name="description" value={formik.values.description || ""} onChange={formik.handleChange} />
                    <TextField label="Veterinarian" name="veterinarian" value={formik.values.veterinarian || ""} onChange={formik.handleChange} />
                    <TextField label="Height" name="height" value={formik.values.height || ""} onChange={formik.handleChange} />
                    <TextField label="Weight" name="weight" value={formik.values.weight || ""} onChange={formik.handleChange} />
                </div>
                <div className='row'>
                    <div className="column jc align-start">
                        <CheckBoxSlider label='Wormed' name='wormed' value={formik.values.wormed || ''} onChange={formik.handleChange} />
                        <CheckBoxSlider label='Coggins' name='coggins' value={formik.values.coggins || ''} onChange={formik.handleChange} />
                    </div>
                    <div className="column jc align-start">
                        <CheckBoxSlider label='Yearly Vaccines' name='yearly_vaccines' value={formik.values.yearly_vaccines || ''} onChange={formik.handleChange} />
                        <CheckBoxSlider label='rabies' name='rabies' value={formik.values.rabies || ''} onChange={formik.handleChange} />
                    </div>
                </div>
                <TextArea label="Notes" name="notes" value={formik.values.notes|| ''} onChange={formik.handleChange} />

                <LoadingButton loading={loading} loadingPosition='center' startIcon={<SaveIcon />} variant='contained' type="submit">Submit</LoadingButton>
            </form>


            {/* New Form */}


        </div>
    )
}
