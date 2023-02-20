const SessionController = require("../session.controller");
const UserDbController = require("./user.db");

class UserController {

  static async addUser(user) {
    let newUser = await UserDbController.post(user);
    let token;
    if (newUser) {
      token = SessionController.gerarToken(newUser.id, SessionController.gerarSegredo(newUser.id, newUser.email))
      newUser.token = token;
      await UserDbController.pathToken(newUser);
    }
    return token
  }

}

module.exports = UserController;