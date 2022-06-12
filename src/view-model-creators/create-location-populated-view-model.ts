import { LocationPopulatedDocument } from '../models/location-model';
import createPropertyViewModel, { PropertyViewModel } from './create-property-view-model';
import { LocationViewModel } from './create-location-view-model';

export type LocationPopulatedViewModel = Omit<LocationViewModel, 'propertyIds'> & {
  properties: PropertyViewModel[],
};

const createLocationPopulatedViewModel = (
  locationPopulatedDoc: any,
): LocationPopulatedViewModel => ({
  id: locationPopulatedDoc._id.toString(),
  region: locationPopulatedDoc.region,
  price: locationPopulatedDoc.price,
  persons: locationPopulatedDoc.persons,
  createdAt: locationPopulatedDoc.createdAt,
  updatedAt: locationPopulatedDoc.updatedAt,
  properties: locationPopulatedDoc.properties.map(createPropertyViewModel),
});

export default createLocationPopulatedViewModel;
