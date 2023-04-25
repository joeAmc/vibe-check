const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: "" },
  timestamp: { type: String, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
