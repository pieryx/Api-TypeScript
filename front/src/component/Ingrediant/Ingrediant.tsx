import React from "react";
import axios from 'axios';
import '../Recette/Recette.css';

import { useState,useEffect } from "react";
export default function Ingrediant(props: { getToken: string; isAdmin:boolean; }) {
  type ingrediant = {
    id_ingrediant: string;
    name:string;
    url_img:string;
  };
    const [ingrediants, setIngrediant] = useState([]);
    const config = {
        headers: { Authorization: "Bearer "+props.getToken }
    };
  useEffect(() => {
    axios.get('/api/ingrediant/client',config)
      .then(response => {
        setIngrediant(response.data.data);
      })
      .catch(error => {
      });
  }, []);

  

  return (
    <>
    <div className="grid-card">
      {ingrediants.map((ingrediant: { id_ingrediant: number | null | undefined; name: string | undefined; url_img: string | undefined; }) => (
        <div key={ingrediant.id_ingrediant}  className="card" >
            <p>{ingrediant.name}</p> 
            <img className="photo" src={ingrediant.url_img} height="150" width="150"/>
        </div>
      ))}
    </div>
    </>
  );
}