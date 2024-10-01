const {
  incrementVisits,
  incrementWatched,
} = require("../controllers/activityStatsController");

const router = require("express").Router();

router.post("/visits", incrementVisits);
router.post("/watched", incrementWatched);

module.exports = router;
