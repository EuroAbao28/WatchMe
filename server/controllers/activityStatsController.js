const activityStatsModel = require("../models/activityStatsModel");

const incrementVisits = async (req, res) => {
  try {
    let response = await activityStatsModel.findOne();

    if (!response) {
      response = await activityStatsModel.create({ visits: 1, watched: 0 });
    } else {
      // Increment visits if the document exists
      response.visits += 1;
      await response.save();
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getVisits = async (req, res) => {
  try {
    const response = await activityStatsModel.findOne();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { incrementVisits, getVisits };
