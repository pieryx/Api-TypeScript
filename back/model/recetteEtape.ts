import { Recette } from "./recette";

export class RecetteEtape {
    numEtage: number;
    name: string;
    description: string;
    recette:Recette;
    constructor(name: string, description: string,numEtage:number,recette:Recette) {
        this.name = name;
        this.description = description;
        this.recette=   recette;
        this.numEtage=numEtage;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getRecette(){
        return this.recette;
    }
    toString(){
        return this
    }
}