import { Router } from 'express';
import {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locations-controller';

const locationsRouter = Router();

locationsRouter.get('/', getLocations);
locationsRouter.get('/:id', getLocation);
locationsRouter.post('/', createLocation);
locationsRouter.patch('/:id', updateLocation);
locationsRouter.delete('/:id', deleteLocation);

export default locationsRouter;
