var express = require("express");
var router = express.Router();

const Token = require("../controllers/token");
const auth = require("../db/authContext");

const token = new Token(auth);

router.post("/", (req, res, next) =>
  token.getToken(req, res).catch(next)
);

router.delete("/", (req, res, next) =>
  token.deleteToken(req, res).catch(next)
);

module.exports = router;
