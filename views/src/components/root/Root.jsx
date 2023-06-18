import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import ScrollTop from '../scrollTop/ScrollTop'

export default function Root() {
  return (
    <>
      <Navbar />
      <ScrollTop>
        <Outlet />
      </ScrollTop>

    </>
  )
}
