import React, { useState } from "react";
import styles from './JournalCard.module.css'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../features/user/userSlice";
import { deleteRidingRecord, editRidingRecord } from "../../../../features/horses/horsesAPI";
import { getHorseByName } from "../../../../features/horses/horsesSlice";




export default function JournalCard({ journal, horse }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [notes, setNotes] = useState(journal.notes)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const handleDelete = async () => {
        if (user.username !== journal.author) { alert("You do not have permision to delete this record"); return; }
        try {
            const choice = window.confirm("This Can Not Be Undone! Proceed with caution!")
            if (choice) {
                const res = await deleteRidingRecord(journal.id)
                if (res.status === 200) {
                    dispatch(getHorseByName(horse.name))
                } else {
                    alert(res)
                }
            }
        } catch (err) {
            alert(err)
        }
    }

    const editEntry = async (e) => {
        e.preventDefault()
        if (user.username !== journal.author) { alert("You do not have permision to edit this record"); return; }
        const body = {
            notes: notes
        }
        await editRidingRecord(journal.id, body)
        dispatch(getHorseByName(horse.name))
        setShowEditForm(false)
    }
    return (
        <div className={styles['journal-card']}>
            {showEditForm &&
                <>
                    <form className={styles['edit-form']}>
                        <textarea name="notes" onChange={(e) => setNotes(e.target.value)}>{journal.notes}</textarea>
                        <div className="btn-container">
                            <button type="submit" onClick={editEntry}>Update</button>
                            <button className={styles['cancel-btn']} type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
                        </div>

                    </form>
                </>}
            <h3>{new Date(journal.date.replace('-', '/')).toDateString()}</h3>
            <h3>{journal.notes}</h3>
            <h3>-{journal.author.split('@')[0]}</h3>
            {user.username === journal.author && <button className={styles['deleteBtn']} onClick={handleDelete}>DELETE</button>}
            {user.username === journal.author && <button onClick={() => { setShowEditForm(!showEditForm) }}>Edit</button>}
        </div>
    )
}

