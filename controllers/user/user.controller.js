const SessionController = require("../session.controller");
const UserDbController = require("./user.db");

class UserController {

  static async addUser(user) {
    let newUser = await UserDbController.post(user);
    let token;
    if (newUser) {
      token = SessionController.gerarToken(newUser)
      newUser.token = token;
      await UserDbController.pathToken(newUser);
    }
    return token
  }

  static async authorizeUser(authId, userId) {
    let newUser = await UserDbController.pathAuth(authId, userId);
    return newUser
  }

}

module.exports = UserController;