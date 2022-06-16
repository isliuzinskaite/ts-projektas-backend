import createLocationPopulatedViewModel, { LocationPopulatedViewModel } from './create-location-populated-view-model';
import { RegionViewModel } from './create-region-view-model';

export type RegionPopulatedViewModel = Omit<RegionViewModel, 'locationIds'> & {
  locations: LocationPopulatedViewModel[],
};

const createRegionPopulatedViewModel = (
  region: any,
): RegionPopulatedViewModel => ({
  id: region._id.toString(),
  name: region.name,
  createdAt: region.createdAt,
  updatedAt: region.updatedAt,
  locations: region.locations.map(createLocationPopulatedViewModel),
});

export default createRegionPopulatedViewModel;
