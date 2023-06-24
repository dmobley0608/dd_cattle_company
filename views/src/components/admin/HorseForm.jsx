import React, { useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { loadHorses, selectHorse } from '../../features/horses/horsesSlice'

import { updateHorseById } from '../../features/horses/horsesAPI'
import { selectUser } from '../../features/user/userSlice'



export default function HorseForm() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const horse = useSelector(selectHorse)


    const handleSubmit = async (e) => {
        const res = await updateHorseById(horse.id, e, user.token)
        if (res.status === 200) {
            alert(`${horse.name} updated successfully`)
            dispatch(loadHorses())
        } else {
            alert("Error updating Horse")
        }

        console.log(res)
    }
    const initialValues = {
        name: horse ? horse.name : "",
        birth_date: horse ? horse.birth_date : "",
        brand: horse ? horse.brand : "",
        color: horse ? horse.color : "",
        bio: horse ? horse.bio : "",
        breed: horse ? horse.breed : "",
        hma: horse ? horse.hma : "",
       
        sex: horse ? horse.sex : ""

    }


    useEffect(() => {

    }, [horse])

    return (
        <div >
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                <Form>
                    <div className='row'>
                        <Field id="name" name="name" placeholder="Name" type="text" />
                        <Field id="birth_date" name="birth_date" placeholder="Birth Date" type="date" />
                    </div>

                    <div className='row'>
                        <Field id="color" name="color" placeholder="color" type="text" />
                        <Field id="sex" name="sex" placeholder="Sex" type="text" />
                        <Field id="breed" name="breed" placeholder="breed" type="text" />
                    </div>

                    <div className='row'>
                    <Field id="hma" name="hma" placeholder="HMA" type="text" />
                    <Field id="brand" name="brand" placeholder="Brand" type="number" />
                    </div>

                    <Field id="brand" name="brand" placeholder="Brand" type="number" />
                    <Field id="bio" name="bio" placeholder="Biography" as="textarea" />
                    <Field type="submit" value="Submit"/>

                </Form>
            </Formik>
        </div>
    )
}
