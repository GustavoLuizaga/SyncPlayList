import { Router } from 'express';
import { signUp, login, logout, refreshToken } from './auth.controller';

const AuthRouter = Router();

AuthRouter.post('/sign-up', signUp);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);
AuthRouter.post('/refresh-token', refreshToken);

export default AuthRouter;