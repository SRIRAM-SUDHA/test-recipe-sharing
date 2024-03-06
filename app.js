const express = require("express");

const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/user", require("./routes/user.route"));
app.use("/recipe", require("./routes/recipe.route"));

app.listen(3000, () => {
  console.log("Running on server 3000");
});
