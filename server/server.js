const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const ticketSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: String, required: true },
});

const boardSchema = new Schema({
  todo: [{ type: ticketSchema }],
  inprog: [{ type: ticketSchema }],
  completed: [{ type: ticketSchema }],
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  board: { type: boardSchema, default: () => ({}) },
});

const User = mongoose.model("User", userSchema);
const Board = mongoose.model("Board", boardSchema);
const Ticket = mongoose.model("Ticket", ticketSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/:username/board", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/:username/board/:action", async (req, res) => {
  const { username, action } = req.params;
  const { _id, title, description, points } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.board[action]) {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Create and add the new ticket
    const newTicket = { _id, title, description, points };
    user.board[action].push(newTicket);

    await user.save();
    res.status(200).json({ message: "Ticket added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/user/:username/board/:action/:ticketId", async (req, res) => {
  const { username, action, ticketId } = req.params;
  const { title, description, points } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.board[action]) {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Update the ticket
    const ticketIndex = user.board[action].findIndex(
      (ticket) => ticket._id == ticketId
    );
    if (ticketIndex === -1) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    user.board[action][ticketIndex].title = title;
    user.board[action][ticketIndex].description = description;
    user.board[action][ticketIndex].points = points;

    await user.save();
    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/user/:username/board/:action/:ticketId", async (req, res) => {
  const { username, action, ticketId } = req.params;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.board[action]) {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Delete the ticket
    user.board[action] = user.board[action].filter(
      (ticket) => ticket._id != ticketId
    );

    await user.save();
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
