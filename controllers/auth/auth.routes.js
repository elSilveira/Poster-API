const SessionController = require("../session.controller");
const { validateToken, createSession } = require("../session.controller");
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
    },
    {
      method: 'POST',
      url: '/login',
      handler: async (req, res) => {
        const email = req.body['email'];
        const password = req.body['password'];
        return await createSession(email,password);
      },
    },
    
  ]
}
module.exports = AuthRoutes