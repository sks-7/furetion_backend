const { Router } = require('express');

const reservationController = Router();

const { Reservation } = require('../models/ReservationModel');
const { Ticket } = require('../models/TicketsModels');

reservationController.post('/add', async (req, res) => {
  try {
    const { ticketId, seats, user } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    const totalPrice = ticket.price * seats.length;
    console.log(totalPrice);
    const reservation = new Reservation({
      ticketId: ticketId,
      seats,
      user,
      totalPrice,
    });
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all reservations
reservationController.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('ticketId');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = { reservationController };
