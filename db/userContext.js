const config = require("../config");
const cosmosClient = require("../db/connection");
const User = require("../models/applicationUser");

const user = new User(
  cosmosClient,
  config.databaseId,
  config.applicationUserId
);

user
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

console.log("exporting user context...");

module.exports = user;
