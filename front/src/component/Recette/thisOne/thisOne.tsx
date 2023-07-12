import React from "react";
import axios from 'axios';
import './thisOne.css';
import toque from '../../img/icon/toque.png';
import chrono from '../../img/icon/chronometre.png';

import plus from '../../img/icon/plus.png';
import crayon from '../../img/icon/crayon.png';
import bin from '../../img/icon/poubelle.png';
import{ Link , useParams} from "react-router-dom";

import { useState,useEffect } from "react";
export default function ThisOne(props: { isAdmin: boolean; getToken: string; }) {
    console.log(props.isAdmin)
    const [state, setState] = useState({ objects: {} });
    const [oneTime, setOneTime] = useState(true);
    const params = useParams();
    const [etapes, setEtapes] = useState([]);
    interface reInterface{
      url_image:string;
      name:string;
      
    }
    const [recette, setRecette] = useState<reInterface>();
    const [contients, setContients] = useState([]);
    const config = {
        headers: { Authorization: "Bearer "+props.getToken }
    };
  useEffect(() => {
    axios.get('/api/recette/client/'+params.id,config)
      .then(response => {
        console.log(response);
        
        setRecette(response.data.data.recette[0]);
        setEtapes(response.data.data.etapes);
        setContients(response.data.data.contient)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
function addContent(){

}
function editContent(id:number,url:string,name:string,quantite:string,unite:string){
    axios.put('/api/recette/client/id'+params.id,{},config)
      .then(response => {
        console.log(response);
        
        setRecette(response.data.data.recette[0]);
        setEtapes(response.data.data.etapes);
        setContients(response.data.data.contient)
      })
      .catch(error => {
        console.error(error);
      });
    }
  return (
    <div className="">
        <div className="card2">
            <img src={recette?.url_image || ""} height="200" width="200"/>
            <div>
                <h2>{recette?.name || ""}</h2>
            </div>
        </div>
        
        <h3>Ingrédiant</h3>
        <div className="grid-card2">
            {contients.map((contient: { id: number; url_img: string; name: string ; quantite: string; unitee: string; }) => (
            <div key={"c-"+contient.id} className="" >
                    <img src={contient.url_img} height="100" width="100"/>
                    <p>{contient.name}</p> 
                    <p>{contient.quantite +" "+contient.unitee}</p> 
            </div>
        ))}
        </div>
        <div>
            
            <h3>Recette</h3>
            {etapes.map((etape: { id: number; name: string; description: string ; }) => (
                <div key={"e-"+etape.id} className="" >
                    <h4>{etape.name}</h4> 
                    <p>{etape.description}</p>
                    <div>
                    
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}