
export enum pem {
    "Admin",
    "Client"
}
export class Token {
    idrandom: number;
    perm: pem;
    token:string;
    constructor(perm: pem) {
        const max = 958225622338
        const min = 85433225622
        this.idrandom = Math.floor(Math.random() * (max - min) + min);
        this.perm = perm;
        this.token=this.Encode()
    }
    
    stringifi() {
        let jsonString: string = '{"id":"' + this.idrandom + '","perm":"' + this.perm + '"}';

        return jsonString;
    }
    Encode() {
        return encode(this.stringifi());
    }
    Decode(token: string) {
        console.log(decode(token))
        const decodetoken=decode(token)
        if(isJsonString(decodetoken)){
            return JSON.parse('{"success":true,"data":'+decodetoken+'}')
        }else{
        console.log(decodetoken)
        return  JSON.parse('{"success":false,"data":""}')
        }
    }
}
function isJsonString(str:string):boolean {
    try {
        JSON.parse(str);
    } catch (e) {
       // console.log(e)
        return false;
    }
    return true;
}
function encode(str: string): string {
    const array = "azertyuiopqsdfghjklmwxcvbn1234567890"
    const elguillement = ["&", '£', '¨', "+", "¤"]
    const deuxpetipoin = ["[", '|', '²', "~", "@"]
    const elparentes1 = ["ù", '$', '^', '#', "?"]
    const elparentes2 = ["!", "§", ";", "-", "*"]
    const vergule = ["/", "%", "(", "=", "µ"]
    let encode = "";
    const decalage = 10
    for (const letter of str) {
        let index = array.indexOf(letter);
        //  console.log(letter + " = "+index)
        if (index == -1) {
            let el = ""
            if (letter == '"') {
                el = elguillement[Math.floor(Math.random() * elguillement.length)]
                encode += el;
            } else {
                if (letter == "{") {
                    el = elparentes1[Math.floor(Math.random() * elparentes1.length)]
                    encode += el
                } else {
                    if (letter == "}") {
                        el = elparentes2[Math.floor(Math.random() * elparentes2.length)]
                        encode += el
                    } else {
                        if (letter == ",") {
                            el = vergule[Math.floor(Math.random() * vergule.length)]
                            encode += el
                        } else {
                            el = deuxpetipoin[Math.floor(Math.random() * deuxpetipoin.length)]
                            encode += el
                        }
                    }
                }

            }
            // console.log("\t vaut : "+el)
        } else {
            // console.log(""+(index + decalage)," > ",array.length," = ",(index + decalage) > array.length)
            if ((index + decalage) >= array.length) {

                //     console.log(array[index + decalage - 36])
                encode += array[index + decalage - 36]
            } else {
                //       console.log(array[index + decalage])
                encode += array[index + decalage]
            }

        }
    }
    return encode;
};
function decode(str: string): string {
    const array = "azertyuiopqsdfghjklmwxcvbn1234567890"
    const elguillement = ["&", '£', '¨', "+", "¤"]
    const deuxpetipoin = ["[", '|', '²', "~", "@"]
    const elparentes1 = ["ù", '$', '^', '#', "?"]
    const elparentes2 = ["!", "§", ";", "-", "*"]
    const vergule = ["/", "%", "(", "=", "µ"]
    let encode = "";
    const decalage = 10
    for (const letter of str) {
        let index = array.indexOf(letter);
      //  console.log(letter + " = " + index)
        if (index == -1) {
            let el = ""
            if (elguillement.indexOf(letter) != -1) {
                el = '"'
                encode += el
            } else {
                if (elparentes1.indexOf(letter) != -1) {
                    el = '{'
                    encode += el
                } else {
                    if (elparentes2.indexOf(letter) != -1) {
                        el = '}'
                        encode += el
                    } else {
                        if (deuxpetipoin.indexOf(letter) != -1) {
                            el = ':'
                            encode += el
                        } else {
                            if(vergule.indexOf(letter) != -1){
                                el = ','
                                encode += el
                            }
                            
                        }
                    }
                }
            }
          //  console.log("\t vaut : " + el)
        } else {
            if ((index - decalage) <= 0) {
                encode += array[index - decalage + 36]
            } else {
                encode += array[index - decalage]
            }
        }
    }
    return encode;
};