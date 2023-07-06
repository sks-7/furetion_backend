const { default: mongoose } = require('mongoose');

const ticketSchema = new mongoose.Schema({
  poster: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  description: { type: String, required: true },
});

// Create a MongoDB model for tickets
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Ticket };
