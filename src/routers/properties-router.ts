import { Router } from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/properties-controller';

const propertiesRouter = Router();

propertiesRouter.get('/', getProperties);
propertiesRouter.get('/:id', getProperty);
propertiesRouter.post('/', createProperty);
propertiesRouter.patch('/:id', updateProperty);
propertiesRouter.delete('/:id', deleteProperty);

export default propertiesRouter;
