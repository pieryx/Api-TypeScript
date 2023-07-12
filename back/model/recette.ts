import { RecetteContient } from "./recetteContient";

export class Recette {
    name: string;
    description: string;
    listRecetteContient: RecetteContient[];
    
    constructor(name: string, description: string, listRecetteContient: RecetteContient[] = []) {
        this.name = name;
        this.description = description;
        this.listRecetteContient = listRecetteContient;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getRecetteContients(){
        return this.listRecetteContient;
    }
    AddRecetteContients(recetteCont:RecetteContient){
        this.listRecetteContient.push(recetteCont);
    }
    removeRecetteContients(recetteCont:RecetteContient){
        this.listRecetteContient=this.listRecetteContient.filter(item => item !== recetteCont);
    }
    toString(){
        let contient:string="";
        this.listRecetteContient.forEach(el =>{contient+=el.toString});
        return "Name : "+ this.getName+"\n Description : "+this.getDescription+"\n\n Contient : "+contient;
    }
}
