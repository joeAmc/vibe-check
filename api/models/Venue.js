const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  vibes: { type: String, default: "1" },
  image: { type: String, required: true },
  timestamp: { type: String, default: Date.now },
  // createdAt: { type: Date, expires: "60m", default: Date.now },
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
