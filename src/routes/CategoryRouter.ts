import { Router } from 'express';
import CategoryController from '@/controllers/CategoryController';
import Auth from '@/middlewares/Auth';
import BodyValidation from '@/middlewares/BodyValidation';
import categoryValidator from '@/validators/CategoryValidator';

const CategoryRouter = Router();

CategoryRouter.route('')
    .get(CategoryController.index)
    .post(Auth({ adminRight: true }), BodyValidation(categoryValidator), CategoryController.store);

CategoryRouter.route('/:id([0-9]+)')
    .get(CategoryController.show)
    .put(Auth({ adminRight: true }), BodyValidation(categoryValidator), CategoryController.update)
    .delete(Auth({ adminRight: true }), CategoryController.delete);

export default CategoryRouter;
