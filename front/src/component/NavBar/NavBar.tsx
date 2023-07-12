import React from "react";
import './NavBar.css'

import { useState,useEffect } from "react";
import{ Link } from "react-router-dom";
export default function NavBar(props: { login: boolean; setlogin: (arg0: boolean) => void; }) {
    
    let islogin=props.login;
    function deconection(){
        props.setlogin(false);
        localStorage.removeItem("token")
    }
    return ( 
    <header className="App-header">
        <h1>Marmiton 2.0  </h1>
        <nav >
            
        {islogin ? <>
            <Link className="link" to="/recettes">Recettes</Link>
            <Link className="link" to="/ingrediants">Ingrediants</Link>
            <p className="link" onClick={()=>{deconection()}}>déconnecter</p>
        </>
           : 
           <><p></p>
           <p></p>

           <Link className="link" to="/login">Connection / Inscription</Link></>
        
       }   </nav>
    </header>
    )
}