import { Schema, model, Document, Types } from 'mongoose';
import { PropertyDocument } from './property-model';

type Location = {
  name: string,
  properties: Types.ObjectId[],
  region: Types.ObjectId,
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
  region: { type: Schema.Types.ObjectId, ref: 'Region' }
}, {
  timestamps: true,  
});

// https://mongoosejs.com/docs/populate.html#populate-virtuals
locationSchema.virtual('properties', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'location',
});

const LocationModel = model('Location', locationSchema);

export default LocationModel;
