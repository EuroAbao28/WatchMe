const { sendMessage, getMessage } = require("../controllers/messageController");
const { getUser } = require("../controllers/userController");

const router = require("express").Router();

router.route("/").post(sendMessage).get(getMessage);
router.get("/getUser", getUser);

module.exports = router;
