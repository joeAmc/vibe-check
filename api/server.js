const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/vibe-check", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// venues
const Venue = require("./models/Venue");
const User = require("./models/User");

app.get("/venues", async (req, res) => {
  const venues = await Venue.find();

  res.json(venues);
});

app.post("/venue/new", async (req, res) => {
  const venue = new Venue({
    type: req.body.type,
    name: req.body.name,
    location: req.body.location,
    image: req.body.image,
  });

  try {
    await venue.save();
    res.status(201).json(venue);
    console.log("venue successfully sent");
  } catch (error) {
    console.error(`Failed to create venue: ${error}`);
    res.status(500).json({ message: "Failed to create venue" });
  }
});

app.delete("/venue/delete/:id", async (req, res) => {
  const result = await Venue.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.put("/venue/:id", async (req, res) => {
  const venue = await Venue.findById(req.params.id);

  venue.vibe++;

  venue.save();
  res.json(venue);
});

// users

app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.post("/user/new", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await user.save();
    console.log("user successfully saved");
    res.status(201).redirect("http://localhost:3000");
  } catch (error) {
    console.error(`Failed to create user: ${error}`);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.delete("/user/delete/:id", async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.put("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        type: req.body.type,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(`Failed to update user: ${error}`);
    res.status(500).json({ message: "Failed to update user" });
  }
});

app.listen(3002, () => {
  console.log("Server started on port 3002");
});
