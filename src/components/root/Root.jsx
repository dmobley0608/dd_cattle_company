import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../features/horses/horsesSlice'
import Loading from '../loading/Loading'


export default function Root() {
  const isLoading = useSelector(selectIsLoading)
  return (
    <>
      <Navbar />
      {isLoading ? <Loading/> :
        <div style={{marginTop:"120px", padding:'0'}}>
             <Outlet  />
        </div>
       
      }

    </>
  )
}
