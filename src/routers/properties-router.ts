import { Router } from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/properties-controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth-middlewares';

const propertiesRouter = Router();

propertiesRouter.get('/', getProperties);
propertiesRouter.get('/:id', getProperty);
propertiesRouter.post('/', authMiddleware, adminMiddleware, createProperty);
propertiesRouter.patch('/:id', authMiddleware, adminMiddleware, updateProperty);
propertiesRouter.delete('/:id', authMiddleware, adminMiddleware, deleteProperty);

export default propertiesRouter;
