import express from 'express';
import { Recette } from '../model/recette'

import { connectionDB } from '../controller/mySql';
import { JSONArray, JSONObject } from '../controller/jsonInterface';
export const recette = express.Router();

recette.get('/client', function (req, res) {
    connectionDB.query('SELECT * FROM recette ', async (err: Error, results_recette: JSONObject) => {
        if (err) throw err;
        if (results_recette.length) {

            const data: JSONObject = results_recette;
            res.json({ "succed": true, "data": data });

        } else {
            res.status(404).json({ "succed": false });
        }
    });

});
recette.get('/client/:id', function (req, res) {
    console.log(req.params.id)
    connectionDB.query('SELECT id,name,quantite,unitee,url_img FROM recette_contient r join ingrediant i on(i.id_ingrediant=r.id_ingrediant) where r.id_recette=?', req.params.id, async (err:Error, results_contient: JSONObject) => {
        if (err) throw err;
        if (results_contient.length) {
            console.log()
            connectionDB.query('SELECT id,name,description,num_etape FROM recette_etape r where r.id_recette=? order by num_etape', req.params.id, async (err:Error, results_etape: JSONObject) => {
                if (err) throw err;
                if (results_contient.length) {
                    connectionDB.query('SELECT * FROM recette r where r.id=? ', req.params.id, async (err: Error, results_recette: JSONObject) => {
                        if (err) throw err;
                        if (results_recette.length) {
                            const data: JSONObject = {"recette":results_recette, "contient": results_contient, "etapes": results_etape };
                            res.json({ "succed": true, "data": data });
                        }
                        else {
                            res.status(404).json({ "succed": false });
                        }
                    });
                }
                else {
                    res.status(404).json({ "succed": false });
                }
            });
        } else {
            res.status(404).json({ "succed": false });
        }
    });
});
recette.get('/client/popular', function (req, res) {
    res.json({ "all": "good" })
});
recette.get('/client/new/:nb', function (req, res) {
    res.json({ "all": "good" })
});
recette.get('/client/search/:mots', function (req, res) {

    //console.log(req.params.mots)
    connectionDB.query('SELECT * FROM recette where name like "%'+req.params.mots+'%"',  async (err:Error, results_reserch: JSONObject) => {

        console.log(results_reserch)
        if (err) throw err;
            console.log(results_reserch)
            const data: JSONObject = results_reserch;
            res.json({ "succed": true, "data": data });
        
    });
});


recette.post('/admin/', function (req, res) {
    const body = req.body;
    const name: string = body.name;
    const prepare: string = body.prepare;
    const dificulty: string = body.dificulty;
    
    const url_image: string = body.url;
    const recette = {
        name: name,
        prepare: prepare,
        dificulty: dificulty,
        
        url_image:url_image
    };
    console.log(recette)
    if (name == undefined ||  url_image == undefined || prepare == undefined || dificulty == undefined) {

        res.status(404).json({ "succed": false });
    } else {
        connectionDB.query('INSERT INTO recette SET ?', recette, (err:Error, results: JSONObject) => {
            if (err) throw err;

            res.json({ "succes": true, "data": results })
        });
    }
});


recette.put('/admin/:id', function (req, res) {
    const body = req.body;
    const id: string = req.params.id;
    const name: string = body.name;
    
    const url_image: string = body.url;
    const prepare: string = body.prepare;
    const dificulty: string = body.dificulty;
    const recette = {
        name: name,
        prepare: prepare,
        dificulty: dificulty,
        url_image:url_image
    };
    console.log(recette)
    if (id == undefined || url_image == undefined ||name == undefined || prepare == undefined || dificulty == undefined) {

        res.status(404).json({ "succed": false });
    } else {
        connectionDB.query('UPDATE recette SET ? WHERE recette.id = ?;', [recette,id], (err:Error, results: JSONObject) => {
            if (err) throw err;

            res.json({ "succes": true, "data": results })
        });
    }
});


recette.delete('/admin/:id', function (req, res) {

    const id: string = req.params.id;
    if (id == undefined) {
        res.status(404).json({ "succed": false });
    } else {
        connectionDB.query('DELETE FROM recette WHERE recette.id = ?;', id, (err:Error, results: JSONObject) => {
            if (err) throw err;

            res.json({ "succes": true, "data": results })
        });
    }
});

