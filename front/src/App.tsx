import './App.css';
import{Routes ,Route } from "react-router-dom";

import { useState } from "react";
import NavBar from './component/NavBar/NavBar'
import Home from './component/Home/Home';
import ThisOne from './component/Recette/thisOne/thisOne';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Recette from './component/Recette/Recette'
import Ingrediant from './component/Ingrediant/Ingrediant'
import Error404 from './component/Error404/Error404'
import React from 'react';

function App() {

const [isLogin, setIsLogin] = useState(false);
const [isAdmin, setIsAdmin] = useState(false);
const [setfirstconection, setfirstco] = useState(true);
const [token, setToken] = useState("");
if(setfirstconection){
  setfirstco(false);
  const localToken=localStorage.getItem('token');
  console.log(localToken);
  if(localToken!=null){
    setIsLogin(true)
    setToken(localToken);
  }
  

}
  return (
    <div className="App">
      <NavBar  login= {isLogin} setlogin={setIsLogin}/>
      <div className="Content">
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login loggin= {isLogin} isAdmin={setIsAdmin} tok={setToken} log={setIsLogin}/>}/>
          <Route path="/register" element={<Register loggin= {isLogin} tok={setToken} log={setIsLogin}/>}/>
          {isLogin ? <>
          <Route path="/recettes" element={<Recette isAdmin={isAdmin} getToken={token}/>}/>
          <Route path="/recettes/:id" element={<ThisOne isAdmin={isAdmin} getToken={token}/>}/>
          <Route path="/ingrediants" element={<Ingrediant isAdmin={isAdmin} getToken={token}/>}/>
          </>:<></>}
          <Route path="/*" element={<Error404/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
