import { Router } from 'express';
import { signUp, login, logout } from './auth.controller';

const AuthRouter = Router();

AuthRouter.post('/sign-up', signUp);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);

export default AuthRouter;