import { Request, Response } from 'express';
import { registerUser } from './auth.services';


export const signUp = async (req: Request, res: Response) => {
  const data = req.body;

  const result = await registerUser(data);

  if (!result.ok) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  // Implementation for user sign-in
}
