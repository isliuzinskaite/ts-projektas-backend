import { Schema, model, Document, Types } from 'mongoose';

type Property = {
  title: string,
  address: string,
  image: string,
  phone: string,
  location: Types.ObjectId,
  createdAt: string,
  updatedAt: string,
}

export type PropertyDocument = Document<Types.ObjectId, unknown, Property> & Property & {
  _id: Types.ObjectId;
};

const propertySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: { type: Schema.Types.ObjectId, ref: 'Location' }
}, {
  timestamps: true,  
});

const PropertyModel = model('Property', propertySchema);

export default PropertyModel;
