const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class SessionController {

  static gerarSegredo(usuarioId, email) {
    const segredo = usuarioId + email;
    return crypto.createHash('sha256').update(segredo).digest('hex');
  }

  static gerarToken(usuarioId, segredo) {
    const payload = { usuario_id: usuarioId };
    const opcoes = { expiresIn: '30d' };
    const token = jwt.sign(payload, segredo, opcoes);
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
}

module.exports = SessionController