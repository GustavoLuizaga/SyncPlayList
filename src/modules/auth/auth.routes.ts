import { Router } from 'express';
import { signUp, login } from './auth.controller';

const AuthRouter = Router();

AuthRouter.post('/sign-up', signUp);
AuthRouter.post('/login', login);

export default AuthRouter;