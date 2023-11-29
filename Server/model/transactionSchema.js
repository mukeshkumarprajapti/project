const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderUserId: {
    type: String, // Assuming userId is a string, modify accordingly
    required: true,
  },
  receiverUserId: {
    type: String, // Assuming userId is a string, modify accordingly
    required: true,
  },
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
