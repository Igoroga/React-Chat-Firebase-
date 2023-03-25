const Object11111111111 = {
    name1: Igor,
    name2: Serega,
    name3: Podpishiss,
    myMethod: function() {
      console.log(this.name1);
    }
  };
  
   // logs myObject

  const Object222 = {
    name1: "Igor",
    name2: "Serega",
    name3: "Podpishiss",
    myMethod: function() {
      console.log(this.name3);
    }
  };
  
  Object222.myMethod(); // Podpishiss


  const Object332 = {
    name1: "Igor",
    name2: "Serega",
    name3: "Podpishiss",
    myMethod: () => {
      console.log(this.name3);
    }
  };


  const Object333 = {
    name1: "Igor",
    name2: "Serega",
    name3: "Podpishiss",
    myMethod: function() {
      const myArrowFunc = () => {
        console.log(this.name3);
      };
      myArrowFunc();
    }
  };
  
  Object333.myMethod(); // Podpishiss

  const myObject = {
    name: "Alice",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: {
        myMethod: () => {
          console.log(this.age);
        }
    }
      },
      getFullAddress: function() {
        const getFormattedAddress = () => {
          console.log('asdas'); ;
        };
        return getFormattedAddress();
      }
    }
    
  
  
  myObject.address.zip.myMethod();

  import React from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore } from "firebase/firestore";
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { async } from '@firebase/util';
import {useCollectionData} from "react-firebase-hooks/firestore"
import Loader from './Loader';
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


const Chat = () => {
  const auth  = getAuth();
  const db = getFirestore();
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')
  const [message, loading] = useCollectionData(collection(db, "messages"))


  const sendMessage = async () => {
    collection('messages').add({
      uid:user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: Timestamp()
    })
    setValue('')
  }

 

  if (loading) {
    return <Loader/>
  }

  return (
    <Container>
      <Grid container
        style={{ height: window.innerHeight - 100 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <div style={{ width: '80%', height: '60vh', border: '1px solid blue', borderRadius: '10px', overflowY: 'auto' }}>
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