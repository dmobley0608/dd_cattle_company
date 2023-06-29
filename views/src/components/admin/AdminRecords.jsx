import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseById, selectHorse } from '../../features/horses/horsesSlice'
import './admin-components.styles.css'

import { deleteRecordById, } from '../../features/horses/horsesAPI'
import MedicalRecordForm from './MedicalRecordForm'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    <div id="admin-record" className='flex'>
      <MedicalRecordForm record={record} setRecord={setRecord} />
      <div className='record-list' >
        {horse.MedicalRecords && horse.MedicalRecords.map(record => (

          <div key={record.id} className='record'>
            <div className='cell'>
              <p>{record.date}</p>
            </div>
            <div className='cell'>
              <p>{record.description}</p>
            </div>
            <div className='cell'>
              <p onClick={() => setRecord(() => record)}><EditIcon className='icon'/></p>
            </div>
            <div className='cell'>
              <p onClick={() => handleDelete(record.id)}><DeleteForeverIcon className='icon'/></p>
            </div>

          </div>

        ))}
      </div>

    </div>
  )
}
