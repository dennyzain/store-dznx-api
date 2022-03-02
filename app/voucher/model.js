const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let voucherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama game wajib diisi'],
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    thumbnail: {
      type: String,
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    nominals: [{ type: Schema.Types.ObjectId, ref: 'Nominal' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = model('Voucher', voucherSchema);
