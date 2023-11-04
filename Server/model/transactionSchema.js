const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
