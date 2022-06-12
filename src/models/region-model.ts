import { Schema, model, Document, Types } from 'mongoose';
import { LocationDocument } from './location-model';

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
  locations: LocationDocument[]
};

const regionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  locations: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    default: [],
  },
}, {
  timestamps: true,  
});

// collection name - "regions"
const RegionModel = model('Region', regionSchema);

export default RegionModel;
