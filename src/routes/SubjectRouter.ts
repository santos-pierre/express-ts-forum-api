import SubjectController from '@/controllers/SubjectController';
import Auth from '@/middlewares/Auth';
import BodyValidation from '@/middlewares/BodyValidation';
import { subjectUpdateValidator, subjectValidator } from '@/validators/SubjectValidator';
import { Router } from 'express';

const SubjectRouter = Router();

SubjectRouter.route('/')
    .get(SubjectController.index)
    .post(Auth({ adminRight: false }), BodyValidation(subjectValidator), SubjectController.store);

SubjectRouter.route('/:id')
    .get(SubjectController.show)
    .put(Auth({ adminRight: false }), BodyValidation(subjectUpdateValidator), SubjectController.update)
    .delete(SubjectController.delete);

export default SubjectRouter;
