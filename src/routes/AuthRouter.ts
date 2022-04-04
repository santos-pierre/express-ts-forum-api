import { Router } from 'express';
import AuthController from '@/controllers/AuthController';
import BodyValidation from '@/middlewares/BodyValidation';
import { authLoginValidator, authRegisterValidator } from '@/validators/AuthValidator';

const AuthRouter = Router();

AuthRouter.post('/login', BodyValidation(authLoginValidator), AuthController.login);

AuthRouter.post('/register', BodyValidation(authRegisterValidator), AuthController.register);

export default AuthRouter;
