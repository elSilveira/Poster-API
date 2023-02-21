const SessionController = require("../session.controller");
const UserDbController = require("./user.db");

class UserController {

  static async getUserByLogin(email, password) {
    return await UserDbController.getUserByLogin(email, password)
  }

  static async addUser(user) {
    let newUser = await UserDbController.post(user);
    return await this.updateUserToken(user);
  }

  static async updateUserToken(user) {
    let token;
    if (user) {
      token = SessionController.gerarToken(user)
      user.token = token;
      await UserDbController.pathToken(user);
    }
    return user;
  }

  static async authorizeUser(authId, userId) {
    return await UserDbController.pathAuth(authId, userId);
  }

}

module.exports = UserController;