const ApplicationUser = require("../models/applicationUser");
const generateToken = require("../utils/jwt/generateToken");
const generateRefreshToken = require("../utils/jwt/generateRefreshToken");
const config = require("../config");

const bcrypt = require("bcrypt");

class Login {
  /**
   * Login Controller
   * @param {ApplicationUser} applicationUser
   */
  constructor(applicationUser) {
    this.applicationUser = applicationUser;
  }

  async getLoginDetails(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const querySpec = {
      query: `SELECT * 
              FROM root r
              WHERE r.username = @username`,
      parameters: [
        {
          name: "@username",
          value: username,
        },
      ],
    };

    const auth = await this.applicationUser.find(querySpec);
    if (auth.length > 0) {
      const validPass = await bcrypt.compare(password, auth[0].password);
      if (validPass) {
        const accessToken = generateToken(auth[0].id);
        const refreshToken = generateRefreshToken(auth[0].id);
        const item = {
          id: auth[0].id,
          refreshToken: refreshToken
        }
        try {
          // Insert refresh token in database
          const container = this.applicationUser.database.container(config.authorizationId);
          await container.items.upsert(item);
          const results = {};
          results.secret = { accessToken, refreshToken };
          res.json(results);
        } catch (err) {
          res.status(409);
          res.json(err);
        }
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  }
}

module.exports = Login;
