const database = require("../db");

class UserDbController {
  /**
  * Buscar um user específica pelo ID
  *
  * @param id da user a ser buscada
  */
  static get(id) {
    return database.get('user', id);
  }

  /**
  * Busca todos as users do banco
  */
  static get() {
    return database.get('user', null);
  }

  static async post(user) {
    let res = await database.insert(
      'user',
      'nome, sobrenome, email, password',
      `"${user.nome}", 
      "${user.sobrenome}", 
      "${user.email}", 
      "${user.password}"`)
    user.id = res.insertId;
    return user;
  }

  /**
  * Busca todos as users do banco
  */
  static pathToken(user) {
    let values = `token="${user.token}"`;
    return database.update('User', values, 'id=' + user.id);
  }

  /**
  * Busca todos as users do banco
  */
  static delete(id) {
    return database.delete('User', id);
  }
}

module.exports = UserDbController;