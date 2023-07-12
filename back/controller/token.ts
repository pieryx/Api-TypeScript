
import express from 'express';
export const auth = express.Router();
import { Token, pem } from '../model/token'
export function createtoken(perme: pem): Token {
    return new Token(perme);
}
export function decode(string: string): JSON {
    const t = new Token(pem.Client).Decode(string);
    return t;
}
export function encode(Token: Token): string {
    return Token.Encode();
}
auth.use(function (req, res, next) {

    /*const to:Token = createtoken(pem.Admin)
     console.log(to)
     const toe =encode(to)
     console.log(toe)
     const dtoe=decode(toe);
     console.log(dtoe)*/
    if (req.headers.authorization != undefined && req.headers.authorization.split(" ")[0] === "Bearer") {
        const urlEncodedToken = req.headers.authorization.split(" ")[1]
        const tokenclear: JSON = decode(urlEncodedToken);
        //console.log(tokenclear)
        if ("success" in tokenclear) {
           // console.log("test")
            if (!tokenclear.success) {
               // console.log("test2")
                res.status(401).json({ "code": "401", "error": "Bad token" })
            }
            else {
                if ("data" in tokenclear) {
                    //console.log("in")
                    const data:any=tokenclear.data
                    if ("perm" in data) {
                       // console.log("in2")
                        if (data.perm == pem.Admin) {
                          //  console.log("inad")
                            //console.log((req.originalUrl).split("/")[3])
                            next()
                        } else {
                            if (data.perm == pem.Client) {
                            //    console.log("incli")
                                if ((req.originalUrl).split("/")[3] == "client") {
                                    next()
                                } else {
                                    res.status(401).json({ "code": "401", "error": "Look like you not authorized" })
                                }
                            } else {
                                res.status(401).json({ "code": "401", "error": "Look like you not authorized" })
                            }
                        }
                    } else {
                        res.status(401).json({ "code": "401", "error": "Bad token" })
                    }
                } else {
                    res.status(401).json({ "code": "401", "error": "Bad token" })
                }
                //console.log(tokenclear)
            }
        }else{
            res.status(401).json({ "code": "401", "error": "Bad token" })
        }
    } else {
        res.status(401).json({ "code": "401", "error": "Look like you not authorized" })
    }

});