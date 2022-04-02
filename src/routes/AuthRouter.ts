import { Router } from 'express';
import AuthController from 'src/controllers/AuthController';
import BodyValidation from 'src/middlewares/BodyValidation';
import { authLoginValidator, authRegisterValidator } from 'src/validators/AuthValidator';

const AuthRouter = Router();

AuthRouter.post('/login', BodyValidation(authLoginValidator), AuthController.login);

AuthRouter.post('/register', BodyValidation(authRegisterValidator), AuthController.register);

export default AuthRouter;
