const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const Board = mongoose.model("User", boardSchema);

module.exports = Board;
