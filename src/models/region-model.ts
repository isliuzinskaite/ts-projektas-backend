import { Schema, model, Document, Types } from 'mongoose';
import { LocationPopulatedDocument } from './location-model';

type Region = {
  name: string,
  locations: Types.ObjectId[],
  createdAt: string,
  updatedAt: string,
}

export type RegionDocument = Document<Types.ObjectId, unknown, Region> & Region & {
  _id: Types.ObjectId;
};

export type RegionPopulatedDocument = Omit<RegionDocument, 'locations'> & {
  locations: LocationPopulatedDocument[]
};

const regionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,  
});

// https://mongoosejs.com/docs/populate.html#populate-virtuals
regionSchema.virtual('locations', {
  ref: 'Location',
  localField: '_id',
  foreignField: 'region',
});

const RegionModel = model('Region', regionSchema);

export default RegionModel;
