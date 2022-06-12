import { RegionDocument } from '../models/region-model';

export type RegionViewModel = {
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

const createRegionViewModel = (region: RegionDocument): RegionViewModel => ({
  id: region._id.toString(),
  name: region.name,
  createdAt: region.createdAt,
  updatedAt: region.updatedAt,
});

export default createRegionViewModel;
