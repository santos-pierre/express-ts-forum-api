import { Router } from 'express';
import CategoryController from 'src/controllers/CategoryController';
import BodyValidation from 'src/middlewares/BodyValidation';
import categoryValidator from 'src/validators/CategoryValidator';

const CategoryRouter = Router();

CategoryRouter.route('')
    .get(CategoryController.index)
    .post(BodyValidation(categoryValidator), CategoryController.store);

CategoryRouter.route('/:id([0-9]+)')
    .get(CategoryController.show)
    .put(BodyValidation(categoryValidator), CategoryController.update)
    .delete(CategoryController.delete);

export default CategoryRouter;
