const config = require("../config");
const cosmosClient = require("./connection");
const Auth = require("../models/auth");

const auth = new Auth(cosmosClient, config.databaseId, config.authorizationId);

auth
  .init((err) => {
    console.error(err);
  })
  .catch((err) => {
    console.error(err);
    console.error(
      "Shutting down because there was an error settinig up the database."
    );
    process.exit(1);
  });

console.log("exporting auth context...");

module.exports = auth;
