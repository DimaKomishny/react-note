import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import Note from "../components/Note";

const GET_NOTES = "/v1/note"

function Home(props) {
    const [notes, setNotes] = React.useState([])
    const { auth } = useContext(AuthContext);

    useEffect(()=> {
        try {
            const response = axios.get(GET_NOTES,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': auth.accessToken
                    },
                }
            ).then((resp) => {
                console.log(JSON.stringify(resp?.data));
                setNotes(resp?.data);
            });
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div>
            {notes.map((n) => <Note text={n.text} title={n.title} key={n.id} id={n.id}/>)}
        </div>
    )
}

export default Home;