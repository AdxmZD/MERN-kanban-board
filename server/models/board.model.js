const mongoose = require("mongoose");
const { Schema } = mongoose;
const Ticket = require("./models/ticket.model");

const boardSchema = new Schema({
  todo: [{ type: ticketSchema }],
  inprog: [{ type: ticketSchema }],
  completed: [{ type: ticketSchema }],
});

const Board = mongoose.model("User", boardSchema);

module.exports = Board;
