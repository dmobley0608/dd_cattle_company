import React from 'react'
import styles from './CardContainer.module.css'


export default function CardContainer({children}) {
  return (
    <div className={styles['card-container']}>
        {children}
    </div>
  )
}
