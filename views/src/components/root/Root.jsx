import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../features/horses/horsesSlice'


export default function Root() {
  const isLoading = useSelector(selectIsLoading)
  return (
    <>
      <Navbar />
      {isLoading ? <h1>Loading</h1> :

        <Outlet />
      }

    </>
  )
}
