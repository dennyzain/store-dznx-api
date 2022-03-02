const mongoose = require('mongoose');
const { urlDb } = require('../config');

async function db() {
  mongoose.connect(urlDb, { autoIndex: true, autoCreate: true });
}

module.exports = db;
