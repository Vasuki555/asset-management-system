import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Returned'],
    default: 'Pending'
  },
  returnDate: {
    type: Date,
    default: null
  },
  remarks: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
