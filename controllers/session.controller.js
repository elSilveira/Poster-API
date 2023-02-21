const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../.env.js');
const UserController = require('./user/user.controller.js');

module.exports = class SessionController {

  static gerarToken(user) {
    const payload = { AA: user.id, AB: user.email };
    const opcoes = { expiresIn: '10s' };
    const token = jwt.sign(payload, crypto.createHash('sha256').update(env.APP.secret).digest('hex'), opcoes);
    return token;
  }

  static validarToken(token, segredo) {
    try {
      const decoded = jwt.verify(token, segredo);
      return decoded.usuario_id;
    } catch (err) {
      return null;
    }
  }

  static validateToken(req, res, next) {
    // Get the authorization header from the request
    const authHeader = req.headers['authorization'];

    // Check if the authorization header is present
    if (authHeader) {
      // Extract the token from the authorization header
      const token = jwt.decode(authHeader);
      const segredo = crypto.createHash('sha256').update(env.APP.secret).digest('hex');

      try {
        // Verify the token using the secret key
        const decodedToken = jwt.verify(authHeader, segredo);
        req.user = decodedToken["AA"];
        // Add the decoded token to the request object
        req.decodedToken = decodedToken;

        // Call the next middleware or final request handler
        next();
      } catch (err) {
        // Return an error response if the token is invalid
        res.status(401).json({ error: 'Invalid token' });
      }
    } else {
      // Return an error response if the authorization header is missing
      res.status(401).json({ error: 'Authorization header missing' });
    }
  }

  static async createSession(email, password) {
    let user = await UserController.getUserByLogin(email, password);
    if (!user) {
      return "Not Found!"
    }
    let token = jwt.verify(user.token, crypto.createHash('sha256').update(env.APP.secret).digest('hex'));

    return (token.exp < Date.now() / 1000) ? UserController.updateUserToken(user) : user.token;
  }
}
