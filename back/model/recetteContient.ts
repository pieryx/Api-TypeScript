import { Ingrediant } from "./ingrediant";

export enum unitee {
    " - ",
    "mL",
    "L",
    "g",
    "Kg",
    "verre",
    "dose",
    "cuillère à soupe",
    "cuillère à café"
}

export class RecetteContient {
    quantite: number;
    unitee: string;
    ingrediant: Ingrediant;

    constructor(quantite: number,unite:string,ingrediant:Ingrediant) {
        this.quantite=quantite;
        if(Object.values(unitee).find(item => item === unite)){
            this.unitee=unite;
        }else{
            this.unitee=unitee[0];
        }
        this.ingrediant=ingrediant;
    }
    getQuantite(){
        return this.quantite;
    }
    getUnitee(){
        return this.unitee;
    }
    getIngrediant(){
        return this.ingrediant;
    }
    toString(){
        return "\t - Quantité : "+this.getQuantite+"\n \t - Unitée : "+this.getUnitee+"\n\n Ingrediant : \n"+this.getIngrediant.toString;
    }

}