import React from "react";
import axios from 'axios';
import './Recette.css';
import toque from '../../img/icon/toque.png';
import chrono from '../../img/icon/chronometre.png';

import plus from '../../img/icon/plus.png';
import crayon from '../../img/icon/crayon.png';
import bin from '../../img/icon/poubelle.png';
import{ Link } from "react-router-dom";
import { useState,useEffect } from "react";
export default function Recette(props: { getToken: string; isAdmin: boolean; }) {

function editContent(id:string,url:string,name:string,prepare:string,dificulty:string){
    console.log(url)
    axios.put('/api/recette/admin/'+id,{
        "name":name,
            "prepare": prepare,
            "dificulty": dificulty,
            "url":url
    },config)
      .then(response => {
        console.log(response);
axios.get('/api/recette/client',config)
      .then(response => {
        //console.log(response);
        setRecettes(response.data.data);
      })
      .catch(error => {
        //console.error(error);
      });
  
      })
      .catch(error => {
        console.error(error);
      });
    }
    function addContent(url:string,name:string,prepare:string,dificulty:string){
        console.log(url)
        axios.post('/api/recette/admin/',{
            "name":name,
                "prepare": prepare,
                "dificulty": dificulty,
                "url":url
        },config)
          .then(response => {
            console.log(response);
    axios.get('/api/recette/client',config)
          .then(response => {
            //console.log(response);
            setRecettes(response.data.data);
          })
          .catch(error => {
            //console.error(error);
          });
      
          })
          .catch(error => {
            console.error(error);
          });
        }
    const [state, setState] = useState<{ objects: string[] }>({
      objects: []
    });
    interface Recette
    { name: string ; id: string ; url_image: string ; prepare: string ; dificulty: string ; }
    
    const [recettes, setRecettes] = useState<Recette[]>([]);
    const config = {
        headers: { Authorization: "Bearer "+props.getToken }
    };
  useEffect(() => {
    axios.get('/api/recette/client',config)
      .then(response => {
        //console.log(response);
        setRecettes(response.data.data);
      })
      .catch(error => {
        //console.error(error);
      });
  }, []);
  function deleteContent(id: string){
    axios.delete('/api/recette/admin/'+id,config)
        .then(response => {
          //console.log(response);
          axios.get('/api/recette/client',config)
      .then(response => {
        //console.log(response);
        setRecettes(response.data.data);
      })
      .catch(error => {
        //console.error(error);
      });
  
        })
        .catch(error => {
          //console.error(error);
        });
  }
  function search(mot: string){
    if(mot==""){
        axios.get('/api/recette/client/',config)
        .then(response => {
          //console.log(response);
          setRecettes(response.data.data);
        })
        .catch(error => {
          //console.error(error);
        });
    }else{
        axios.get('/api/recette/client/search/'+mot,config)
        .then(response => {
          //console.log(response);
          setRecettes(response.data.data);
        })
        .catch(error => {
          //console.error(error);
        });
    }
    

  }

  return (
    <>
    <input className="search" placeholder="Rechercher.." onChange={(e)=>search(e.target.value)}/>
    <div className="grid-card">
      {recettes.map((recette) => (
        <>
        {props.isAdmin? 
                    <>
        <div className="card-2" >
            <input id={"c-name-"+recette.id} defaultValue={recette.name} />
            <Link key={recette.id} className="link" to={"/recettes/"+recette.id}><img className="photo" src={recette.url_image} height="150" width="150"/>
            
            </Link><input id={"c-url-"+recette.id} defaultValue={recette.url_image} />
            
            <div className="ajustement">
                <div className="right"> 
                    <img src={chrono} height="30"/>
                    <input className="little" id={"c-prepare-"+recette.id} defaultValue={recette.prepare}/>
            
                </div>
                <div className="left"> 
                    <img src={toque} height="30"/>
                    <input className="little" id={"c-dificulty-"+recette.id} defaultValue={recette.dificulty} />
            
                </div>
            </div>
            <div className="option">
                <img src={crayon} height="15" width="15" onClick={()=>{
                  editContent(
                    recette.id,
                    (document.getElementById("c-url-"+recette.id)as HTMLInputElement).value,
                  (document.getElementById("c-name-"+recette.id)as HTMLInputElement).value,
                  (document.getElementById("c-prepare-"+recette.id)as HTMLInputElement).value,
                  (document.getElementById("c-dificulty-"+recette.id)as HTMLInputElement).value
                  )}}/>
                <img src={bin} height="15" width="15" onClick={()=>{deleteContent(recette.id)}}/>
            
            </div>
        </div>
        </>:<>
        <Link key={recette.id} className="link" to={"/recettes/"+recette.id}>
        <div className="card" >
            <p>{recette.name}</p> 
            <img className="photo" src={recette.url_image} height="150" width="150"/>
            <div>
                <div className="right"> 
                    <img src={chrono} height="30"/>
                    <p>{recette.prepare}</p>
                </div>
                <div className="left"> 
                    <img src={toque} height="30"/>
                    <p>{recette.dificulty}</p>
                </div>
            </div>
            </div>
        </Link>
        </>}

        </>
      ))}
      {props.isAdmin? 
                    <>
      <div className="card-2" >
        <p>Nom: </p>
            <input id={"a-name-"} defaultValue="" />
            <p>url image: </p>
            <input id={"a-url-"} defaultValue=""/>
            
            <div className="ajustement">
                <div className="right"> 
                    <img src={chrono} height="30"/>
                    <p>temps : </p>
                    <input className="little" id={"a-prepare-"} defaultValue=""/>
            
                </div>
                <div className="left"> 
                    <img src={toque} height="30"/>
                    <p>dificulter: </p>
                    <input className="little" id={"a-dificulty-"} defaultValue=""/>
            
                </div>
            </div>
            <div className="option">
                <img src={plus} height="15" width="15" onClick={()=>{
                  addContent(
                    (document.getElementById("a-url-")as HTMLInputElement).value,
                    (document.getElementById("a-name-")as HTMLInputElement).value,
                    (document.getElementById("a-prepare-")as HTMLInputElement).value,
                    (document.getElementById("a-dificulty-")as HTMLInputElement).value
                    )}}/>
            
            </div>
        </div>
        </>:<></>}
    </div>
    </>
  );
}