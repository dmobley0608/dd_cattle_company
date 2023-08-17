import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../features/horses/horsesSlice'
import Loading from '../loading/Loading'


export default function Root() {
 
  return (
    <>
      <Navbar />      
        <div style={{marginTop:"120px", padding:'0'}}>
          <Outlet/>    
        </div>
    </>
  )
}
