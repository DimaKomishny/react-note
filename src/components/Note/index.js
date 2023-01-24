import React, {useContext, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from "./Note.module.scss";
import axios from '../../api/axios';
import AuthContext from "../../context/AuthProvider";


const Note = ({title, text, id}) => {
    const inputRef = useRef()
    const {auth} = useContext(AuthContext);
    const [newText, setText] = useState('');
    useEffect(()=> {
        inputRef.current.value = text;
        setText(text)
    },[]);

    return (
        <div className={styles.note}>
            <h1>{"Title: " + title}</h1>
            <div className={styles.noteText}>
                <textarea ref={inputRef}/>
            </div>
            <button onClick={() => {
                axios.post(
                    "/v1/note",
                    {
                        id: id,
                        title: title,
                        text: inputRef.current.value,
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': auth.accessToken
                        }
                    })
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }}>
                Save
            </button>
        </div>
    );
}

export default Note;