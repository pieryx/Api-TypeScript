export class Ingrediant {
    name: string;
    description: string;
    prix:number;
    constructor(name: string,description: string,prix:number) {
      this.name = name;
      this.description=description;
      this.prix=prix;
    }
   
    getName() {
      return this.name;
    }
    toString(){
        return "Name : "+this.getName+"\n Description : "+this.description;
    }
  }