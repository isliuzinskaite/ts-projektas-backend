import { Schema, model, Document, Types } from 'mongoose';
import { PropertyDocument } from './property-model';

type Location = {
  name: string,
  properties: Types.ObjectId[],
  createdAt: string,
  updatedAt: string,
}

export type LocationDocument = Document<Types.ObjectId, unknown, Location> & Location & {
  _id: Types.ObjectId;
};

export type LocationPopulatedDocument = Omit<LocationDocument, 'properties'> & {
  properties: PropertyDocument[]
};

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  properties: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
    default: [],
  },
}, {
  timestamps: true,  
});

// collection name - "locations"
const LocationModel = model('Location', locationSchema);

export default LocationModel;
