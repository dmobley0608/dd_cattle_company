import React from 'react'
import { Field, Form, Formik } from 'formik'
import { addMedicalRecord, updateMedicalRecord } from '../../features/horses/horsesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseById, selectHorse } from '../../features/horses/horsesSlice'
import { selectUser } from '../../features/user/userSlice'

export default function MedicalRecordForm({ record, setRecord }) {
    const horse = useSelector(selectHorse)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const initialValues = {
        "wormed": false,
        "coggins": false,
        "rabies": false,
        "yearly_vaccines": false,
        "notes": "",
        "height":"",
        "weight": "",
        "veterinarian": "",
        "date": "",
        "description": ""
    }

    const handleSubmit = async (e) => {
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
    }
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
            <p onClick={() => setRecord(initialValues)}>Clear Form</p>
            <Formik initialValues={{ ...record }} onSubmit={handleSubmit} enableReinitialize={true}>

                <Form>
                    <div className='row'>
                        <Field id="description" name="description" placeholder="Description" type="text" />
                        <Field id="date" name="date" placeholder="Date" type="date" />
                    </div>
                    <div className='row'>
                        <Field id="weight" name="weight" placeholder="Weight" type="number" />
                        <Field id="height" name="height" placeholder="Height" type="float" />
                    </div>

                    <div className='row'>
                        <div className='checkbox-container'>
                            <label htmlFor="wormed">Wormed</label>
                            <Field id="wormed" name="wormed" type="checkbox" />
                        </div>
                        <div className='checkbox-container'>
                            <label htmlFor="coggins">Coggins</label>
                            <Field id="coggins" name="coggins" type="checkbox" />
                        </div>
                        <div className='checkbox-container'>
                            <label htmlFor="rabies">Rabies</label>
                            <Field id="rabies" name="rabies" type="checkbox" />
                        </div>
                        <div className='checkbox-container'>
                            <label htmlFor="yearlyVaccines">Yearly Vaccines</label>
                            <Field id="yearlyVaccines" name="yearly_vaccines" type="checkbox" />
                        </div>
                    </div>

                    <div className='row'>
                        <Field id="veterinarian" name="veterinarian" placeholder="Veterinarian" type="text" />
                    </div>


                    <Field id="notes" name="notes" placeholder="Notes" as="textarea" />
                    <button type="submit">Submit</button>

                </Form>
            </Formik>
        </div>
    )
}
