const Recipe = require("../controllers/recipe.controller");
const { authenticate } = require("../middlewares/authorizer");
const router = require("express").Router();
const recipe = new Recipe();

router.post("/add-recipe", authenticate, recipe.addRecipe);

router.get("/recipes", authenticate, recipe.getRecipes);

router.put("/update/:id", authenticate, recipe.updateRecipe);

router.delete("/delete/:id", authenticate, recipe.deleteRecipe);

module.exports = router;
