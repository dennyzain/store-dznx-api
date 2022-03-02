const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let transactionSchema = new Schema(
  {
    voucherTopUpHistory: {
      gameName: { type: String, required: [true, 'Nama Game Harus Diisi'] },
      category: { type: String, required: [true, 'Kategori Harus Diisi'] },
      thumbnail: { type: String },
      coinName: { type: String, required: [true, 'Nama Koin Harus Diisi'] },
      coinQuantity: { type: String, required: [true, 'Jumlah Koin Harus Diisi'] },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, required: [true, 'Nama Harus Diisi'] },
      type: { type: String, required: [true, 'Tipe Transaksi Harus Diisi'] },
      bankName: { type: String, required: [true, 'Nama Bank Harus Diisi'] },
      accountNumber: { type: Number, required: [true, 'Nomor Rekening Harus Diisi'] },
    },
    name: {
      type: String,
      required: [true, 'Nama Harus Diisi'],
      minLength: [3, 'Panjang Nama Minimal 3-225 Karakter'],
      maxLength: [3, 'Panjang Nama Maksimal 3-225 Karakter'],
    },
    tax: {
      type: Number,
      default: 0,
    },

    value: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },

    historyUser: {
      name: { type: String, require: [true, 'nama player harus diisi.'] },
      phoneNumber: {
        type: Number,
        require: [true, 'nama akun harus diisi'],
        maxlength: [13, 'panjang nama harus antara 9 - 13 karakter'],
        minlength: [9, 'panjang nama harus antara 9 - 13 karakter'],
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = model('Transaction', transactionSchema);
