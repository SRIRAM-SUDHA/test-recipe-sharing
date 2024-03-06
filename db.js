const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "recipe.db");

const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database,
});

module.exports = { dbPromise };
