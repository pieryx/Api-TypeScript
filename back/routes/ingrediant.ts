import express from 'express';
import { Recette } from '../model/recette'

import { connectionDB } from '../controller/mySql';
import { JSONArray, JSONObject } from '../controller/jsonInterface';
export const ingrediant = express.Router();

ingrediant.get('/client', function (req, res) {

    connectionDB.query('SELECT * FROM ingrediant ', async (err: Error, results_recette: JSONObject) => {
        if (err) throw err;
        if (results_recette.length) {

            const data: JSONObject = results_recette;
            res.json({ "succed": true, "data": data });

        } else {
            res.status(404).json({ "succed": false });
        }
    });
})
ingrediant.get('/client/:id', function (req, res) {
    
    const id: string = req.params.id;
    if (id==undefined) {

        res.status(404).json({ "succed": false });
    } else {
    connectionDB.query('SELECT * FROM ingrediant where ingrediant.id_ingrediant = ? ',id ,async (err: Error, results_recette: JSONObject, ) => {
        if (err) throw err;
        if (results_recette.length) {

            const data: JSONObject = results_recette;
            res.json({ "succed": true, "data": data });

        } else {
            res.status(404).json({ "succed": false });
        }
    });
    }
})
ingrediant.post('/admin/', function (req, res) {
    const body = req.body;
    const name: string = body.name;
    const description: string = body.description;
    const prix: string = body.prix;
    const ingrediant = {
        name: name,
        description: description,
        prix: prix,
    };
    console.log(ingrediant)
    if (name == undefined || description == undefined || prix == undefined) {

        res.status(404).json({ "succed": false });
    } else {
        connectionDB.query('INSERT INTO ingrediant SET ?', ingrediant, (err: Error, results: JSONObject) => {
            if (err) throw err;

            res.json({ "succes": true, "data": results })
        });
    }
});


ingrediant.put('/admin/:id', function (req, res) {
    const body = req.body;
    const id: string = req.params.id;
    const name: string = body.name;
    const description: string = body.description;
    const prix: string = body.prix;
    const ingrediant = {
        name: name,
        description: description,
        prix: prix,
    };
    console.log(ingrediant)
    if (id==undefined||name == undefined || description == undefined || prix == undefined) {

        res.status(404).json({ "succed": false });
    } else {
        connectionDB.query('UPDATE ingrediant SET ? WHERE ingrediant.id_ingrediant = ?;', [ingrediant,id], (err: Error, results: JSONObject) => {
            if (err) throw err;

            res.json({ "succes": true, "data": results })
        });
    }
});


ingrediant.delete('/admin/:id', function (req, res) {

    const id: string = req.params.id;
    if (id == undefined) {
        res.status(404).json({ "succed": false });
    } else {
        connectionDB.query('DELETE FROM ingrediant WHERE ingrediant.id_ingrediant = ?;', id, (err: Error, results: JSONObject) => {
            if (err) throw err;

            res.json({ "succes": true, "data": results })
        });
    }
});