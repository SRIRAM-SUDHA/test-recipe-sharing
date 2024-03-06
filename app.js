const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(express.json());

let db = null;

const initDBServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.log(error.message);
  }
};

initDBServer();

app.use("/user", require("./routes/user.route"));
app.use("/recipe", require("./routes/recipe.route"));

app.listen(3000, () => {
  console.log("Running on server 3000");
});
