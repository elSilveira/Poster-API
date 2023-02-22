const database = require("../db");

class AccountDbController {

  static getUserAccounts(id = null) {
    return database.runQuery(`select * from account where id IN (select account_id from userAccount where user_id = ${id})`);
  }
  
  static async pathToUser(accountId, userId){
    let res = await database.insert(
      'userAccount',
      'user_id, account_id',
      `"${userId}", 
      "${accountId}"`)
    return res.insertId;
  }

  static async post(account) {
    let res = await database.insert(
      'account',
      'nome, descricao',
      `"${account.nome}", 
      "${account.descricao}"`)
    account.id = res.insertId;
    return account;
  }

  static delete(id) {
    return database.delete('account', id);
  }
}

module.exports = AccountDbController;