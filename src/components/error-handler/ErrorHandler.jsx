import React from 'react'
import styles from './ErrorHandler.module.css'
import tumbleweed from '../../static/images/tumbleweed.gif'
export default function ErrorHandler({ message,  }) {
 
  return (
    <div className={styles['error-handler'] + " fade-in"}>
      <img src={tumbleweed} alt="404" />     
      <h1>{message}</h1>
    </div>
  )
}
