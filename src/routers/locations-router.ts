import { Router } from 'express';
import {
  getLocations,
  createLocation,
  deleteLocation,
} from '../controllers/locations-controller';

const locationsRouter = Router();

locationsRouter.get('/', getLocations);
locationsRouter.post('/', createLocation);
locationsRouter.delete('/:id', deleteLocation);

export default locationsRouter;
