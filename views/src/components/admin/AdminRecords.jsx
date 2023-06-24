import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseById, selectHorse } from '../../features/horses/horsesSlice'
import styles from '../../pages/admin/Admin.module.css'

import { deleteRecordById, } from '../../features/horses/horsesAPI'
import MedicalRecordForm from './MedicalRecordForm'


export default function AdminRecords({ user }) {
  const horse = useSelector(selectHorse)
  const [record, setRecord] = useState(null)
  const dispatch = useDispatch();




  const handleDelete = async (id) => {
    await deleteRecordById(id, user.token).then(res => {
      alert('Record Deleted')
      dispatch(getHorseById(horse.id))
    })

  }





  return (
    <div>
      <MedicalRecordForm record={record} setRecord={setRecord} />
      {horse.MedicalRecords.map(record => (
        <div key={record.id} className={`${styles.record}`}>
          <p>{record.date}</p>
          <p>{record.description}</p>
          <p className={`${styles.viewRecordBtn}`} onClick={() => setRecord(record)}>Load</p>
          <p className={`${styles.viewRecordBtn}`} onClick={() => handleDelete(record.id)}>X</p>
        </div>
      ))}

    </div>
  )
}
