const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "recipe.db");

class Recipe {
  // INSERT RECIPES
  addRecipe = async (req, res) => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const { title, description, ingredients, instructions, images } = req.body;
    const userId = req.payload.userId; // Access user ID from decoded token
    const query =
      "INSERT INTO recipes (title, description, ingredients, instructions, images, createdBy) VALUES (?, ?, ?, ?, ?, ?)";

    try {
      await db.run(query, [
        title,
        description,
        ingredients,
        instructions,
        image,
        userId,
      ]);
      res.status(201).send("Recipe created successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  };

  // GET ALL RECIPIES
  getRecipes = async (req, res) => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const query = "SELECT * FROM recipes";

    try {
      const recipes = await db.all(query);
      res.json(recipes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  };

  //UPDATE RECIPIES
  updateRecipe = async (req, res) => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const recipeId = req.params.id;
    const { title, description, ingredients, instructions, images } = req.body;

    const query =
      "UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, images = ? WHERE id = ?";

    try {
      await db.run(query, [
        title,
        description,
        ingredients,
        instructions,
        images,
        recipeId,
      ]);
      res.status(200).send("Recipe updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  };

  //DELETE THE RECIPIES
  deleteRecipe = async (req, res) => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    const recipeId = req.params.id;

    const query = "DELETE FROM recipes WHERE id = ?";

    try {
      await db.run(query, [recipeId]);
      res.status(200).send("Recipe deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  };
}

module.exports = Recipe;
