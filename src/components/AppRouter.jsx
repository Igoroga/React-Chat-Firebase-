import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom"
import { privateRoutes } from '../routes';
import { publicRoutes } from '../routes';
import {useAuthState} from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth";



const AppRouter = () => {
const auth = getAuth();
const [user] = useAuthState(auth)
console.log(user);

    return user ? (
     <Routes>
       {privateRoutes.map(({path, Component}, index) =>
       <Route key={path} path={path} element={<Component/>} />
       )} 
      <Route path="/*" element={<Navigate to="/chat" replace />} />
     </Routes>   
    )
    : (
        <Routes>
       {publicRoutes.map(({path, Component}, index) =>
       <Route key={path} path={path} element={<Component/>} />
       )} 
         <Route path="/*" element={<Navigate to="/login" replace />} />  
        </Routes>   
       );
};



export default AppRouter;