import createPropertyViewModel, { PropertyViewModel } from './create-property-view-model';
import { LocationViewModel } from './create-location-view-model';

export type LocationPopulatedViewModel = Omit<LocationViewModel, 'propertyIds'> & {
  properties: PropertyViewModel[],
};

const createLocationPopulatedViewModel = (
  location: any,
): LocationPopulatedViewModel => ({
  id: location._id.toString(),
  name: location.name,
  price: location.price,
  persons: location.persons,
  createdAt: location.createdAt,
  updatedAt: location.updatedAt,
  properties: location.properties.map(createPropertyViewModel),
});

export default createLocationPopulatedViewModel;
