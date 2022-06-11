import { Router } from 'express';
import {
  getLocations,
  getLocation,
  createLocation,
  deleteLocation,
} from '../controllers/locations-controller';

const locationsRouter = Router();

locationsRouter.get('/', getLocations);
locationsRouter.get('/:id', getLocation);
locationsRouter.post('/', createLocation);
locationsRouter.delete('/:id', deleteLocation);

export default locationsRouter;
