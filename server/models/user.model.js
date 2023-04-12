const mongoose = require("mongoose");
const { Schema } = mongoose;
const Board = require("./models/board.model");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  board: { type: boardSchema, default: () => ({}) },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
