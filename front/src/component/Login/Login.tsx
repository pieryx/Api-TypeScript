import React from "react";
import { useState,useEffect } from "react";
import{ Link,Navigate } from "react-router-dom";
import './Login.css';

import axios from 'axios';
 
export default function Login(props: { tok: (arg0: string) => void; log: (arg0: boolean) => void; isAdmin: (arg0: boolean) => void;loggin:boolean; }) {
    const [ok, setOk] = useState(false);
function login(token: string){
    localStorage.setItem('token', JSON.stringify(token));
    props.tok(token)
    props.log(true)
    setOk(true)
    const config = {
        headers: { 'content-type': 'application/json'}
        
    };
    //console.log(config)
    axios.post('/api/login/client/isAdmin',{"token":token,},config)
  .then(response => {
    console.log(response);
    props.isAdmin(response.data.data.isAdmin)
})
}
  const [l, setL] = useState('');
    const handleChangel = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setL(event.target.value);
      };
      const [p, setP] = useState('');
    const handleChangep = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setP(event.target.value);
      };
    const [messageErreur,setmessageErreur]=useState('');
    
    
    function connection(l: string,p: string){
        
        const config = {
            headers: { 'content-type': 'application/json'}
            
        };
        //console.log(config)
        axios.post('/api/login/client',{"login":l,"pass":p},config)
      .then(response => {
        console.log(response);
        if(response.data.succes){
            login(response.data.data.token);
            setmessageErreur('')
        }else{
            setmessageErreur(response.data.data.message)
        }
        
      })
      .catch(error => {
        console.error(error);
      });
    }
    
    return ( <>{!ok ? < div className="center">
            <h1>Connection</h1>
            <p>Email: </p>
            <input type="email" onChange={handleChangel}/>
            <p>Mot de passe:  </p>
            <input type="password" onChange={handleChangep}/>
            <p></p>
            <input type="submit" onClick={()=>{connection(l,p)}}/>
            <p className="Error">{messageErreur}</p>
            
            <Link className="link" style={{textDecoration:'underline'}} to="/register">pas de compte ?</Link>
        </div>
    :<> <Navigate to="/" replace={true} /></>}</>)
    }