const { default: mongoose } = require('mongoose');

const reservationSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  seats: { type: [String], required: true },
  totalPrice: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = { Reservation };
