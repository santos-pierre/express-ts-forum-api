import { Router } from 'express';
import AuthRouter from '@/routes/AuthRouter';
import CategoryRouter from '@/routes/CategoryRouter';
import SubjectRouter from './SubjectRouter';

const router = Router();

router.use('/category', CategoryRouter);
router.use('/subject', SubjectRouter);
router.use(AuthRouter);

router.get('/hello-world', (req, res) => {
    return res.sendStatus(201);
});

export default router;
