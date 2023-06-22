
import React, { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loadHorses, selectAllHorses, selectIsLoading } from '../../features/horses/horsesSlice'
import {Field, Form, Formik, useFormik} from 'formik'
import {  updateHorseById } from '../../features/horses/horsesAPI'

export default function Admin() {
    const horses = useSelector(selectAllHorses);
    const [horse, setHorse] = useState({})
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)

    const handleSubmit = async(e)=>{
       const res = await updateHorseById(horse.id, e)
       if(res.status === 200){
        dispatch(loadHorses()) 
       }else{
        alert("Error updating Horse")
       }
             
       console.log(res)
    }
    const initialValues = {
        name:horse.name || "",
        birth_date: horse.birth_date || "",
        brand: horse.brand || "",
        color: horse.color || "",
        bio: horse.bio || "",
        breed: horse.breed || "",
        hma: horse.hma || "",
        price: horse.price || null,
        sex: horse.sex || ""

    }

  
    useEffect(()=>{
       
    },[horse])

   

    return (
       
        <div id={styles['admin']} className={`container`}>
             {/* Side Menu */}
            <div className={`${styles.sideMenu}`}>
                <ul>
                    {!isLoading && Object.values(horses).map(horse => <li key={horse.id} onClick={()=>{setHorse(horse)}}>{horse.name}</li> )}
                </ul>
            </div>
            {/* Horse Information */}
            <div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                    <Form>
                        
                        <Field id="name" name="name" placeholder="Name" type="text"/>
                       
                        <Field id="color" name="color" placeholder="color" type="text"/>
                        <Field id="sex" name="sex" placeholder="Sex" type="text"/>
                        
                        <Field id="breed" name="breed" placeholder="breed" type="text"/>
                      
                        <Field id="birth_date" name="birth_date" placeholder="Birth Date" type="date" />
                      
                        <Field id="brand" name="brand" placeholder="Brand" type="number"/>
                        <Field id="bio" name="bio" placeholder="Biography" as="textarea"/>
                        <Field type="submit" value="Update"/>
                        
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
