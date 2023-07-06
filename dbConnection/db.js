const mongoose = require('mongoose');

require('dotenv').config();

const connection = () => {
  return mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connection };
