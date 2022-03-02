const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let paymentSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Wajib Masukkan Tipe Transaksi'],
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    banks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bank',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Payment', paymentSchema);
