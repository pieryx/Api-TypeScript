
import express from "express";
import bodyParser from "body-parser" 
import path from 'path';
import { login } from "../routes/login";
import { recette } from '../routes/recette';
import { ingrediant } from "../routes/ingrediant";
import {auth} from '../controller/token'
import {JSONArray,JSONObject}from '../controller/jsonInterface'
const app = express();
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));
app.use(bodyParser.json({ limit: "50mb" }));

app.use('/api/login', login);
app.use(auth);
app.use('/api/recette', recette);
app.use('/api/ingrediant', ingrediant);


app.listen(3000, () => console.log("Serveur démarré"));
