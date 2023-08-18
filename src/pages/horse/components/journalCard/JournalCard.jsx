import React from "react";
import styles from './JournalCard.module.css'
export default function JournalCard ({journal}) {   
    return (
        <div className={styles['journal-card']}>                  
            <h3>{new Date(journal.date).toDateString()}</h3>
            <h3>{journal.notes}</h3>
            <h3>-{journal.user}</h3>
        </div>
    )
}

