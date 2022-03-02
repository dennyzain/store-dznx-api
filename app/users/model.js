const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Wajib Masukkan Email'],
    },
    name: {
      type: String,
      required: [true, 'Wajib Masukkan Nama'],
    },
    password: {
      type: String,
      required: [true, 'Wajib Masukkan Password'],
    },
    role: {
      type: String,
      enum: ['admin', 'users'],
      default: 'admin',
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Wajib Masukkan Nomer Telepon'],
    },
  },
  { timestamps: true }
);

module.exports = model('Users', usersSchema);
