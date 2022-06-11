import { Schema, model, Document, Types } from 'mongoose';

type Location = {
  region: string,
  price: string,
  persons: string,
  createdAt: string,
  updatedAt: string,
}

export type LocationDocument = Document<Types.ObjectId, unknown, Location> & Location & {
  _id: Types.ObjectId;
};

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
