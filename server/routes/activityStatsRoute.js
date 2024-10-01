const {
  incrementVisits,
  getVisits,
} = require("../controllers/activityStatsController");

const router = require("express").Router();

router.route("/visits").post(incrementVisits).get(getVisits);

module.exports = router;
