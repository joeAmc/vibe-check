const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Venue = require("./models/Venue");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log(`Connected to database`);
    const venuesCollection = mongoose.connection.collection("venues");
    await venuesCollection.createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 3600 }
    );
    console.log("TTL index created for the venues collection");
  })
  .catch((err) => {
    console.log("ERROR!!!", err);
  });

// venues
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

app.delete("/venue/deleteall", async (req, res) => {
  const result = await Venue.deleteMany({
    type: "Cosy_Pub",
  });

  res.json(result);
});

app.put("/venue/vibes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { vibes } = req.body;

    if (!id || !vibes) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(
      id,
      { vibes },
      { new: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    return res.json(updatedVenue);
  } catch (error) {
    console.error(`Failed to update venue vibes: ${error}`);
    return res.status(500).json({ message: "Failed to update venue vibes" });
  }
});

// users
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  try {
    await user.save();

    const token = createToken(user._id);

    res.status(201).json({ token, email });
    console.log("user successfully signed up");
  } catch (error) {
    console.error(`Failed to sign up user: ${error}`);
    res.status(500).json({ message: "Failed to sign up user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ token, email });
    console.log("user successfully logged in");
  } catch (error) {
    console.error(`Failed to log in user: ${error}`);
    res.status(500).json({ message: "Failed to log in user" });
  }
});

app.post("/check-user", async (req, res) => {
  const { username, email } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.json({ exists: true });
    }

    res.json({ exists: false });
  } catch (error) {
    console.error(`Failed to check user: ${error}`);
    res.status(500).json({ message: "Failed to check user" });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.delete("/user/delete/:id", async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.delete("/users/deleteall", async (req, res) => {
  const result = await User.deleteMany();

  res.json(result);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`);
});
