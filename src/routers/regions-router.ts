import { Router } from 'express';
import {
  getRegions,
  getRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} from '../controllers/regions-controller';

const regionsRouter = Router();

regionsRouter.get('/', getRegions);
regionsRouter.get('/:id', getRegion);
regionsRouter.post('/', createRegion);
regionsRouter.patch('/:id', updateRegion);
regionsRouter.delete('/:id', deleteRegion);

export default regionsRouter;
