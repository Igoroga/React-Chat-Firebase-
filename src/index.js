import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


initializeApp({
  apiKey: "AIzaSyASnO19lg_fiybWZ252axGfTlSx0dEfkGY",
  authDomain: "react-chat-firebase-mui.firebaseapp.com",
  projectId: "react-chat-firebase-mui",
  storageBucket: "react-chat-firebase-mui.appspot.com",
  messagingSenderId: "807297756761",
  appId: "1:807297756761:web:621c9fba98e0834a264b48",
  measurementId: "G-X1JZTX5Z5L"
})

export const Context = createContext(null)
const number = 5


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Context.Provider value={number}>
    <App />
    </Context.Provider>
  </React.StrictMode>
);


