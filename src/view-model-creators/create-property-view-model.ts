import { PropertyDocument } from '../models/property-model';

export type PropertyViewModel = {
  id: string,
  title: string,
  address: string,
  image: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
};

const createPropertyViewModel = (property: PropertyDocument): PropertyViewModel => ({
  id: property._id.toString(),
  title: property.title,
  address: property.address,
  image: property.image,
  phone: property.phone,
  createdAt: property.createdAt,
  updatedAt: property.updatedAt,
});

export default createPropertyViewModel;
