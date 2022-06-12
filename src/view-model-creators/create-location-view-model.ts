import { LocationDocument } from '../models/location-model';

export type LocationViewModel = {
  id: string,
  name: string,
  price: string,
  persons: string,
  createdAt: string,
  updatedAt: string,
};

const createLocationViewModel = (location: LocationDocument): LocationViewModel => ({
  id: location._id.toString(),
  name: location.name,
  price: location.price,
  persons: location.persons,
  createdAt: location.createdAt,
  updatedAt: location.updatedAt,
});

export default createLocationViewModel;
