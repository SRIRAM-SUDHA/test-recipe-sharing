const bcrypt = require("bcrypt");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "recipe.db");

class User {
  // SIGN UP
  signUp = async (req, res) => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const { username, name, password, gender } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      const createUserQuery = `
      INSERT INTO 
        user (username, name, password, gender) 
      VALUES 
        (
          '${username}', 
          '${name}',
          '${hashedPassword}', 
          '${gender}'
        )`;
      const dbResponse = await db.run(createUserQuery);
      const newUserId = dbResponse.lastID;
      res.send(`Created new user with ${newUserId}`);
    } else {
      res.status(400).send("User already exists");
    }
  };

  //User login
  login = async (req, res) => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const { username, password } = req.body;
    const queryForUser = "SELECT * FROM user WHERE username = ?";

    try {
      const user = await db.get(queryForUser, [username]);
      if (!user) {
        res.status(400).send("Invalid user");
      } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          const payload = { username: username };
          const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
          res.status(200).send({ jwtToken });
          console({ jwtToken });
        } else {
          res.status(400).send("Invalid password");
        }
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  };

  getProfile = async (req, res) => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const { username } = req.payload; // Access username from decoded token
    const queryForUser = "SELECT * FROM user WHERE username = ?";

    try {
      const user = await db.get(queryForUser, [username]);
      if (!user) {
        res.status(404).send("User not found");
      } else {
        // Exclude sensitive information like password before sending response
        delete user.password;
        res.json(user);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  };
}

module.exports = User;
