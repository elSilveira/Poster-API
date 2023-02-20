
const db = require("../controllers/db");
class sessionRoutes {
  static routes = [
    {
      method: 'GET',
      url: '/testdatabase',
      handler: async () => {
        return await db.testDatabase();
      },
    },
    {
      method: 'GET',
      url: '/login',
      handler: async () => {
        return await SessionController.login();
      },
    }]
}
module.exports = sessionRoutes;