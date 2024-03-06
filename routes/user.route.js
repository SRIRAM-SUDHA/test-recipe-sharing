const User = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authorizer");
const router = require("express").Router();
const user = new User();

router.post("/signup", user.signUp);

router.post("/login", user.login);

router.get("/profile", authenticate, user.getProfile);

module.exports = router;
