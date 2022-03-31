import { Router } from 'express';
import CategoryRouter from './CategoryRouter';

const router = Router();

router.use('/category', CategoryRouter);

export default router;
