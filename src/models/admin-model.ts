import { Schema, model, Document, Types } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type Admin = {
  email: string,
  password: string,
  name: string,
  createdAt: string,
  updatedAt: string,
}

export type AdminDocument = Document<Types.ObjectId, unknown, Admin> & Admin & {
  _id: Types.ObjectId;
};

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

adminSchema.plugin(uniqueValidator);
const AdminModel = model('Admin', adminSchema);

export default AdminModel;
