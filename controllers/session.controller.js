const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../.env.js');

class SessionController {

  static gerarSegredo() {
    return crypto.createHash('sha256').update(env.APP.secret).digest('hex');
  }

  static gerarToken(user) {
    const payload = { AA: user.id, AB: user.email };
    const opcoes = { expiresIn: '30d' };
    const token = jwt.sign(payload, this.gerarSegredo(), opcoes);
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

  // Define the middleware function
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
}

module.exports = SessionController