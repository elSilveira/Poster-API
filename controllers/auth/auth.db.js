const database = require("../db");

class AuthDbController {

  static get() {
    return database.get('auth', null);
  }

  static async post(auth) {
    let res = await database.insert(
      'auth',
      'provedor, provedor_id, token_acesso, token_atualizacao, expiracao_token',
      `"${auth.provedor}", 
      "${auth.provedor_id}", 
      "${auth.token_acesso}", 
      "${auth.token_atualizacao}", 
      "${auth.expiracao_token}"`)
    auth.id = res.insertId;
    return auth;
  }
}
module.exports = AuthDbController;