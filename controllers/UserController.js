const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const userController = express.Router();
userController.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const find_user = await User.findOne({ email });

    if (!find_user) {
      return res.status(401).send('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, find_user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign(
      { id: find_user._id, email: find_user.email },
      'sachinhello',
      { expiresIn: '2 days' }
    );

    const name = email.split('@')[0];

    return res.send({ message: 'Login successful', name, token });
    
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

userController.post('/signup', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let find_user = await User.findOne({ email });
    if (find_user) {
      return res
        .status(401)
        .send(
          'Email is already in use. Please try using a different email address.'
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.send({
      message: `Successfully signed up with email: ${email}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = userController;
