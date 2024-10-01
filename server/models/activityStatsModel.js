const mongoose = require("mongoose");

const activityStatsSchema = mongoose.Schema(
  {
    visits: { type: Number, default: 0, required: true },
    watched: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ActivityStats", activityStatsSchema);
