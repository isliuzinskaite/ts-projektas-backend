import { Router } from 'express';
import {
  getRegions,
  getRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} from '../controllers/regions-controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth-middlewares';

const regionsRouter = Router();

regionsRouter.get('/', getRegions);
regionsRouter.get('/:id', getRegion);
regionsRouter.post('/', authMiddleware, adminMiddleware, createRegion);
regionsRouter.patch('/:id', authMiddleware, adminMiddleware, updateRegion);
regionsRouter.delete('/:id', authMiddleware, adminMiddleware, deleteRegion);

export default regionsRouter;
