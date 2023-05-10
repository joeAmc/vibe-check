const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  vibes: { type: Number, default: 0 },
  image: { type: String, required: true },
  timestamp: { type: String, default: Date.now },
  // createAt: {
  //   type: Date,
  //   default: Date.now(),
  //   index: { expires: "3600s" },
  // },
  // expireAt: { type: Date, default: Date.now, index: { expires: "10s" } },
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
