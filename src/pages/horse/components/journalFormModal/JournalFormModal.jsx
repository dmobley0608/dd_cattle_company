import React, { useState } from 'react'
import styles from './JournalFormModal.module.css'
import { TextArea, TextField } from '../../../../components/forms/inputs'
import { Button } from '@mui/material'
import { addRidingRecord } from '../../../../features/horses/horsesAPI'
import { useDispatch } from 'react-redux'
import { getHorseByName } from '../../../../features/horses/horsesSlice'



export default function JournalFormModal({ horse, setShow }) {
    const [notes, setNotes] = useState("")
    const [date, setDate] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        const log = {
            notes, date
        }
        try{
            const data = await addRidingRecord(horse.id, log)
            console.log(data)
            if(data.status === 200){
                setShow(false)
                await dispatch(getHorseByName(horse.name))
            }else{
                alert(data)
            }
        }catch(err){
            if(!err.response) alert(err)
            if (err.response.status !== 200) {
                alert(err.response.data)
                return
            }
        }    
      
    }
    return (
        <div className={styles['journal-form-modal']}>
            <h2>Add Ride</h2>
            <button className={styles['closeBtn']} onClick={() => setShow(false)} >X</button>
            <TextField type='date' name='date' onChange={(e) => setDate(e.target.value)} />
            <TextArea label={"Tell Us About The Ride"} name='notes' onChange={(e) => setNotes(e.target.value)} />
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
