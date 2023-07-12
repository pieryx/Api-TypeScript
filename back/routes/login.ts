import express from 'express';
const bcrypt = require("bcrypt")
import { connectionDB } from '../controller/mySql';
import { Login } from '../model/login'
export const login = express.Router();
import { Token, pem } from '../model/token';
import { JSONArray, JSONObject } from '../controller/jsonInterface';


login.post('/client/', async function (req, res) {
    
    const body = req.body
    // console.log("in")
    if ("login" in body) {
        if ("pass" in body) {
            const login = body.login;
            const pass = body.pass;
            connectionDB.query('SELECT login,password,token FROM `login` where login = ?;', login, async (err:Error, results:any) => {
                if (err) throw err;
                if (results.length) {
                    
                    const token = results[0].token
                    const currentLogin = new Login('unknow', login, pass, token)
                    const matchPassWord = await currentLogin.comparePassWord(results[0].password)
                    //console.log(matchPassWord)
                    if (matchPassWord) {
                        res.json({ "succes": true, "data": { "token": token } })
                    } else {
                        res.json({ "succes": false, "data": { "message": "not Matching login or password" } })
                    }
                } else {
                    res.json({ "succes": false, "data": { "message": "not Matching login or password" } })
                }
            });
        } else {
            res.status(404).json({ "id": 404, "message": "not good body" })
        }
    } else {
        res.status(404).json({ "id": 404, "message": "not good body" })
    }
});
login.post('/client/create', async function (req, res) {
    const body = req.body
    // console.log("in")
    if ("login" in body) {
        if ("pass" in body) {
            if ("name" in body) {
                const login = body.login;
                const pass = body.pass;
                const name = body.name;
                connectionDB.query('SELECT login FROM `login` where login = ?;', login, async (err:Error, results:JSONObject) => {
                    if (err) throw err;
                    if (!results.length) {
                        const curenttoken = new Token(pem.Client)
                        const encodeToken = curenttoken.Encode()
                        const currentLogin = new Login(name, login, pass, encodeToken)
                        const hash = await currentLogin.gethash()
                        const newUser = {
                            name: name,
                            login: login,
                            password: hash,
                            token: encodeToken
                        };
                        connectionDB.query('INSERT INTO login SET ?', newUser, (err:Error, results:JSONObject) => {
                            if (err) throw err;
                            console.log('New user inserted with ID:', results.insertId);
                        });
                        res.json({ "succes": true, "data": { "token": encodeToken } })
                    } else {
                        res.json({ "succes": false, "data": { "message": "login already exist" } })
                    }
                });
            } else {
                res.status(404).json({ "id": 404, "message": "not good body" })
            }
        } else {
            res.status(404).json({ "id": 404, "message": "not good body" })
        }
    } else {
        res.status(404).json({ "id": 404, "message": "not good body" })
    }
});
login.post('/client/isAdmin', async function (req, res) {
    const curenttoken:Token = new Token(pem.Client)
    const result:boolean= curenttoken.Decode(req.body.token).data.perm==pem.Admin
    res.json({ "succes": true, "data": { "isAdmin":result } })
})