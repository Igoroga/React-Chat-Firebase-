
import React from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore } from "firebase/firestore";
import { Container } from '@mui/system';
import { Avatar, Button, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { async } from '@firebase/util';
import {useCollectionData} from "react-firebase-hooks/firestore"
import Loader from './Loader';
import { useEffect } from 'react';
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useCallback } from 'react';


const Chat = () => {
  const auth  = getAuth();
  const db = getFirestore();
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')
  


  const [messagesData, setMessagesData] = useState([]);

  const sendMessage = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setValue("");
  };

  const getMessages = useCallback(async () => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      setMessagesData([]);

      querySnapshot.docs.map((doc) => {
        setMessagesData((prevState) => {
          return [...prevState, doc.data()];
        });
      });
    });
  }, [db]);

  useEffect(() => {
    getMessages();
  }, [getMessages, user]);
 

  

  return (
    <Container>
      <Grid container
        style={{ height: window.innerHeight - 100 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <div style={{ width: '80%', height: '60vh', border: '1px solid blue', borderRadius: '10px', overflowY: 'auto' }}>
        {messagesData.map((message, index) => 
          <div key={index} style={{
            margin: 10,
            border: user.uid === message.uid ? "2px solid rgb(169, 247, 252)" : "2px dashed red",
            borderRadius: "10px",
            backgroundColor: 'rgb(224, 253, 255)',
            marginLeft: user.uid === message.uid ? "auto" : "10px",
            width: 'fit-content',
            padding: 5
          }}>
           <Grid container>
            <Avatar src={message.photoURL}></Avatar>
            <div style={{margin: 10}}>{message.displayName}</div>
            </Grid>
            <div style={{margin: 5}}>{message.text}</div>
          </div>
          )}
        </div>
        <Grid
          container
          style={{ width: '80%', display: 'flex', justifyContent: "end" }}
        >
          <TextField
            rows={2}
            variant="outlined"
            style={{ width: '80%', height: '50px' }}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button onClick={sendMessage} style={{ border: '1px solid gray', marginLeft: '30px' }}>Send</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;