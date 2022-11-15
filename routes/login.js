var express = require("express");
var router = express.Router();

const Login = require("../controllers/login");
const applicationUser = require("../db/userContext");

const login = new Login(applicationUser);

router.post("/", (req, res, next) =>
  login.getLoginDetails(req, res).catch(next)
);

module.exports = router;
