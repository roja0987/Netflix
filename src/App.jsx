import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx';
import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login.jsx';
import Player from './pages/Player/Player.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const nav=useNavigate();
  useEffect(()=>{
      onAuthStateChanged(auth,async(user)=>{
        if(user){
          console.log("Logied in");
         nav('./');
        }
        else{
          console.log("logged out");
          nav('/login');
        }
      })
  },[])
  return (
    <div>
      <ToastContainer theme='dark'/>
     <Routes>
      <Route path='/'element={ <Home></Home>}/>
      <Route path='/login'element={ <Login></Login>}/>
      <Route path='/player/:id' element={<Player></Player>}/>
     </Routes>
   
    </div>
  )
}

export default App
