const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let nominalSchema = new Schema(
  {
    coinQuantity: {
      type: Number,
      default: 0,
    },
    coinName: {
      type: String,
      required: [true, 'Wajib pilih nama koin'],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model('Nominal', nominalSchema);
