import createLocationViewModel, { LocationViewModel } from './create-location-view-model';
import { RegionViewModel } from './create-region-view-model';

export type RegionPopulatedViewModel = Omit<RegionViewModel, 'locationIds'> & {
  locations: LocationViewModel[],
};

const createRegionPopulatedViewModel = (
  region: any,
): RegionPopulatedViewModel => ({
  id: region._id.toString(),
  name: region.name,
  createdAt: region.createdAt,
  updatedAt: region.updatedAt,
  locations: region.locations.map(createLocationViewModel),
});

export default createRegionPopulatedViewModel;
