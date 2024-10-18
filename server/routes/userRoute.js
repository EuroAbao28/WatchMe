const { login, create, getUser } = require("../controllers/userController");

const router = require("express").Router();

router.get("/getUser", getUser);
router.post("/login", login);
router.post("/create", create);

module.exports = router;
