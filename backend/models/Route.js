const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a route name'],
    trim: true
  },
  origin: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  destination: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  waypoints: [{
    address: String,
    lat: Number,
    lng: Number,
    order: Number
  }],
  travelMode: {
    type: String,
    enum: ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'],
    default: 'DRIVING'
  },
  distance: {
    text: String,
    value: Number // in meters
  },
  duration: {
    text: String,
    value: Number // in seconds
  },
  routeData: {
    type: Object,
    // Stores the full Google Maps route response
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  },
  tags: [String],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUsed: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
RouteSchema.index({ user: 1, createdAt: -1 });
RouteSchema.index({ shareToken: 1 });

module.exports = mongoose.model('Route', RouteSchema);

