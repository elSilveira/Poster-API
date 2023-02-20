const bluebird = require('bluebird');
const mysql = require('mysql2/promise');
const env = require('../.env.js');

class database {
  //Cria o banco de dados com a conexão padrão
  static async createDatabase(nome) {
    const connection = await mysql.createConnection({
      host: env.DATABASE.host,
      user: env.DATABASE.user,
      password: env.DATABASE.password,
      Promise: bluebird
    });
    connection.execute(`create database ${nome}`);
  }

  static createConnection() {
    return mysql.createConnection({
      host: env.DATABASE.host,
      user: env.DATABASE.user,
      password: env.DATABASE.password,
      database: env.DATABASE.database,
      Promise: bluebird
    });
  }

  static async testDatabase() {
    const connection = await this.createConnection();
    connection.connect((err) => {
      if (err) {
        return 'Error connecting to MySQL server: ' + err.stack;
      }

      connection.end();
      return console.log('Connected to MySQL server with ID ' + connection.threadId);

    });
  }

  static async insert(tabela, colunas, values) {
    console.log(tabela, colunas)
    const connection = await this.createConnection();
    const [rows, fields] = await connection.execute(`insert into ${tabela} (${colunas}) values (${values})`);
    return rows;
  }

  static async deleteAll(tabela) {
    const connection = await this.createConnection();
    const [rows, fields] = await connection.execute(`delete from ${tabela}`)
    return rows;
  }

  static async delete(tabela, id) {
    const connection = await this.createConnection();
    const [rows, fields] = await connection.execute(`delete from ${tabela} where id = ${id}`)
    return rows;
  }

  /**
   * Cria uma string a partir do objeto dbObject para nova tabela no banco.
   *
   * @param valores Valores devem vir no formato 'key=value, key2=value2' 
  */
  static async update(tabela, valores, condicao) {
    const connection = await this.createConnection();
    const [rows, fields] = await connection.execute(`UPDATE ${tabela} SET ${valores} WHERE ${condicao}`);
    return `Atualizado com sucesso`;
  }

  static async get(tabela, id) {
    const connection = await this.createConnection();
    const [rows, fields] = await connection.execute(`SELECT * FROM ${tabela} ${id != null ? 'WHERE ID = ' + id : ''}`);
    return rows;
  }

}

module.exports = database;