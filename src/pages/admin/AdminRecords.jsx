import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHorseById, selectHorse } from '../../features/horses/horsesSlice'


import { deleteRecordById, } from '../../features/horses/horsesAPI'
import MedicalRecordForm from './forms/MedicalRecordForm'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Modal } from '@mui/material'

export default function AdminRecords({ user }) {
  const horse = useSelector(selectHorse)
  const [record, setRecord] = useState(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();




  const handleDelete = async (id) => {
    await deleteRecordById(id, user.token).then(res => {
      alert('Record Deleted')
      dispatch(getHorseById(horse.id))
    })

  }





  return (
    <div id="admin-record" >
      <MedicalRecordForm record={record} setRecord={setRecord} setOpen={setOpen} />
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title">

        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
         bgcolor:'background.paper', maxWidth:'600px', width:'100%', padding:'12px', borderRadius:'5px' }}>
          <h2 id="modal-modal-title">Records for {horse.name}</h2>
          <div className='record-list'>
        
            {horse.MedicalRecords && horse.MedicalRecords.map(record => (
            
              <div key={record.id} className='record'>
                <div className='cell'>
                  <p>{record.date}</p>
                </div>
                <div className='cell'>
                  <p>{record.description}</p>
                </div>
                <div className='cell'>
                  <p onClick={() => { setRecord(() => record); setOpen(false) }}><EditIcon className='icon' /></p>
                </div>
                <div className='cell'>
                  <p onClick={() => { handleDelete(record.id); setOpen(false) }}><DeleteForeverIcon className='icon' /></p>
                </div>

              </div>

            ))}
          </div>

        </Box>
      </Modal>


    </div>
  )
}
