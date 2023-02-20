const AuthDbController = require("./auth.db");
const { OAuth2Client } = require("google-auth-library");
const { google } = require('googleapis');
const UserController = require("../user/user.controller");
const env = require('../../.env.js');
const auth = new OAuth2Client(env.GOOGLE.clientId, env.GOOGLE.clientSecret, env.GOOGLE.redirectUrl);
class AuthController {

  static async createAuth(auth) {
    let newAuth = await AuthDbController.post(auth);
    return newAuth
  }

  static async googleAuth() {
    const authUrl = auth.generateAuthUrl({
      accessType: "offline",
      prompt: "consent",
      scope: ["email"]
    });
    return authUrl
  }

  static async finalizeGoogleAuth(code, user) {
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);

    var auth = {
      provedor: 'google',
      provedor_id: 'google_consent',
      token_acesso: code,
      token_atualizacao: Date.now(),
      expiracao_token: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    let newAuth = await AuthDbController.post(auth);
    UserController.authorizeUser(newAuth.id, user);
  }
}

module.exports = AuthController;