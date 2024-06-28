const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

require('./db/connection');
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

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
