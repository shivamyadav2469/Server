const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000;
const mongoDBURL = process.env.MONGODB_URL;

mongoose.connect(mongoDBURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const app = express();

app.use(cors());
app.use(express.json());

const User = require('./Models/User');

app.post("/", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
