const bcrypt = require("bcrypt")

export class Login {
  name: string;
  login: string;
  password: string;
  token: string;
  listRecette: BigInt[];
  constructor(name: string, login: string, password: string, token: string, listRecette: BigInt[] = []) {
    this.name = name;
    this.password = password;
    this.login = login;
    this.token = token;
    this.listRecette = listRecette;
  }
  getLogin() {
    return this.login;
  }
  async gethash() {
    let hashp;
    hashp =bcrypt.hashSync(this.password, "$2b$10$6P.oJ5Qlv5GyvjJ43pL/N.");
      
    console.log("hash= "+hashp)
    return await hashp
  }
  async comparePassWord(hash: string) {
    return await bcrypt.compareSync( this.password,hash)
  }
}
