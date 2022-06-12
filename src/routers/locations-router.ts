import { Router } from 'express';
import {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locations-controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth-middlewares';

const locationsRouter = Router();

locationsRouter.get('/', getLocations);
locationsRouter.get('/:id', getLocation);
locationsRouter.post('/', authMiddleware, adminMiddleware, createLocation);
locationsRouter.patch('/:id', authMiddleware, adminMiddleware, updateLocation);
locationsRouter.delete('/:id', authMiddleware, adminMiddleware, deleteLocation);

export default locationsRouter;
