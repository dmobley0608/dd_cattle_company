import React from 'react'
import styles from './CardContainer.module.css'


export default function CardContainer({id,children}) {
  return (
    <div id={id} className={styles['card-container']}>
        {children}
    </div>
  )
}
