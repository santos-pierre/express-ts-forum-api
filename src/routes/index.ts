import { Router } from 'express';
import AuthRouter from './AuthRouter';
import CategoryRouter from './CategoryRouter';

const router = Router();

router.use('/category', CategoryRouter);
router.use(AuthRouter);

export default router;
