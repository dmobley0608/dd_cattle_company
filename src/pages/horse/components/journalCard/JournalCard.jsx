import React from "react";

export default function JournalCard (journal) {
    return (
        <>
            <h2>{journal.title}</h2>
            <h3>{journal.date}</h3>
            <h3>{journal.body}</h3>
            <h3>-{journal.user}</h3>
        </>
    )
}

