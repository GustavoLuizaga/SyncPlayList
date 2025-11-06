import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.services';
import { signupSchema } from './schemas/signup.schema';

export const signUp = async (req: Request, res: Response) => {
  //TODO: Create midleware for validation

  const data = req.body;
  const result = await registerUser(data);

  if (!result.ok) {
    return res.status(400).json(result);
  }

  return res.status(201).json({
    message: result.message,
    status: 201,
    data: result.data,
    ok: true,
  });
};

export const login = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await loginUser(data);
  if (!result.ok) {
    return res.status(400).json(result);
  }
  return res.cookie('token', result.data?.token, { httpOnly: true }).
    status(200).json({
      message: result.message,
      status: 200,
      data: result.data,
      ok: true,
    });
};


export const logout = (req: Request, res: Response) => {
  return res.clearCookie('token').status(200).json({
    message: 'Logout successful',
    status: 200,
    ok: true,
  });
};