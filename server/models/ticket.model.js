const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
