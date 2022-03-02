const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let bankSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama pemilik wajib diisi'],
    },
    bankName: {
      type: String,
      required: [true, 'Nama bank wajib diisi'],
    },
    accountNumber: {
      type: Number,
      required: [true, 'Nomor rekening wajib diisi'],
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    nominals: [{ type: Schema.Types.ObjectId, ref: 'Nominal' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = model('Bank', bankSchema);
