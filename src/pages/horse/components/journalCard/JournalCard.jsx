import React from "react";
import styles from './JournalCard.module.css'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../features/user/userSlice";
import { deleteRidingRecord } from "../../../../features/horses/horsesAPI";
import { getHorseByName } from "../../../../features/horses/horsesSlice";
export default function JournalCard ({journal, horse}) {   
    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const handleDelete=async()=>{       
        if(user.username !== journal.author){alert("You do not have permision to delete this record"); return;}
        try{
            const choice = window.confirm("This Can Not Be Undone! Proceed with caution!")
            if(choice){
            const res = await deleteRidingRecord(journal.id)          
            if(res.status === 200){
                dispatch(getHorseByName(horse.name))
            }else{
                alert(res)
            }
        }
        }catch(err){
            alert(err)
        }
       
    }
    return (
        <div className={styles['journal-card']}>                  
            <h3>{new Date(journal.date.replace('-','/')).toDateString()}</h3>
            <h3>{journal.notes}</h3>
            <h3>-{journal.author.split('@')[0]}</h3>
            {user.username === journal.author && <button className={styles['deleteBtn']} onClick={handleDelete}>DELETE</button>}
        </div>
    )
}

