import React from 'react'
import ddc from '../../static/images/ddc-load.png'
import './loading.styles.css'
export default function Loading() {
  return (
    <div className='loading-module'>
        <img src={ddc} alt="" />
        <div className="ball-loader">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>        
        </div>
    </div>
  )
}
