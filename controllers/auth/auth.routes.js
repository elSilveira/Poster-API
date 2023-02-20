const { validateToken } = require("../session.controller");
const { finalizeGoogleAuth, googleAuth } = require("./auth.controller");

class AuthRoutes {
  static routes = [
    {
      method: 'GET',
      url: '/auth', 
      preHandler: validateToken,
      handler: async (req, res) => {
        const code = req.query.code;
        return await finalizeGoogleAuth(code, req.user);
      },
    },
    {
      method: 'GET',
      url: '/google',
      handler: async (req, res) => {
        const code = req.query.code;
        return await googleAuth();
      },
    }
  ]
}
module.exports = AuthRoutes