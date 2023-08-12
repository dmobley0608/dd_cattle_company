import React from 'react'
import ddc from '../../static/images/ddc-load.png'
import './loading.styles.css'
export default function Loading() {
  return (
    <div className='loading-module'>
        <img src={ddc} alt="" />
        <h1>LOADING...</h1>
    </div>
  )
}
