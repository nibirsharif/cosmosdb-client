const Auth = require("../models/auth");
const generateToken = require("../utils/jwt/generateToken");
const config = require("../config");

const jwt = require('jsonwebtoken');

class Token {
  /**
   * Token Controller
   * @param {Auth} auth
   */
  constructor(auth) {
    this.auth = auth;
  }

  async getToken(req, res) {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(201);

    const container = this.auth.database.container(config.authorizationId);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      // query to return all items
      const querySpec = {
        query: "SELECT c.refreshToken from c where c.id=@id",
        parameters: [
          {
            name: "@id",
            value: user.id,
          },
        ],
      };

      const { resources: items } = await container.items.query(querySpec).fetchAll();
      if (err || items.length == 0) return res.sendStatus(403);
      if (items[0].refreshToken != refreshToken) return res.sendStatus(403);

      const accessToken = generateToken(user.id);
      const results = {};
      results.secret = { accessToken };
      res.json(results);
    });
  }

  async deleteToken(req, res) {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(201);

    const container = this.auth.database.container(config.authorizationId);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      try {
        const { resource: result } = await container.item(user.id, user.id).delete(); 
      } catch (e) {
        res.sendStatus(e.code);
      }
      res.sendStatus(204);
    });
  }
}

module.exports = Token;
