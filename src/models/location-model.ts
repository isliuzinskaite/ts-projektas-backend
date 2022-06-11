import { Schema, model } from 'mongoose';

const locationSchema = new Schema({
  region: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,  
});

// collection name - "locations"
const LocationModel = model('Location', locationSchema);

export default LocationModel;
