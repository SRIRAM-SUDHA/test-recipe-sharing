const Recipe = require("../controllers/recipe.controller");
const { authenticate } = require("../middlewares/authorizer");
const router = require("express").Router();
const recipe = new Recipe();

router.post("/add-recipe", authenticate, recipe.addRecipe);

router.get("/recipes", authenticate, recipe.getRecipes);

router.put("/recipe/:id", authenticate, recipe.updateRecipe);

router.delete("/recipe/:id", authenticate, recipe.deleteRecipe);

module.exports = router;
