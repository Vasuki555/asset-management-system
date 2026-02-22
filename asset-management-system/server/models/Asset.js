import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  assetId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please provide asset name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse', 'Printer', 'Furniture', 'Other']
  },
  serialNumber: {
    type: String,
    required: [true, 'Please provide serial number'],
    unique: true,
    trim: true
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Please provide purchase date']
  },
  cost: {
    type: Number,
    required: [true, 'Please provide cost']
  },
  warrantyExpiry: {
    type: Date,
    required: [true, 'Please provide warranty expiry date']
  },
  status: {
    type: String,
    enum: ['Available', 'Assigned', 'Maintenance', 'Retired'],
    default: 'Available'
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

// Auto-generate assetId before saving
assetSchema.pre('save', async function(next) {
  if (!this.assetId) {
    const count = await mongoose.model('Asset').countDocuments();
    this.assetId = `AST${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
