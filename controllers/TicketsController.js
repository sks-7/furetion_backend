const express = require('express');

const ticketController = express.Router();

const { Ticket } = require('../models/TicketsModels');

ticketController.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single ticket by ID
ticketController.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search tickets by name
ticketController.get('/search', (req, res) => {
  
  res.send("hello")

  // console.log(req.query)
  console.log("hello")

  // try {
  //   const { name } = req.query;
  //   const tickets = await Ticket.findOne({name:name});
  //   res.json(tickets);
  // } catch (error) {

  //   console.log(error)
  //   res.status(500).json({ error: error });
  // }
});

// Create a new ticket
ticketController.post('/add', async (req, res) => {
  try {
    const { poster, name, price, available, description } = req.body;
    const ticket = new Ticket({ poster, name, price, available, description });
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a ticket by ID
ticketController.put('/:id', async (req, res) => {
  try {
    const { poster, name, price, available, description } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { poster, name, price, available, description },
      { new: true }
    );
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a ticket by ID
ticketController.delete('/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = { ticketController };
