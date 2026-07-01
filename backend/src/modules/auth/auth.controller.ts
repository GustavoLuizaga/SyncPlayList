import { Request, Response } from 'express';
import { registerUser, loginUser, refreshAccessToken } from './auth.services';


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
  res.cookie('refreshToken', result.data?.refreshToken, { httpOnly: true })
  return res.cookie('accessToken', result.data?.accessToken, { httpOnly: true }).
    status(200).json({
      message: result.message,
      status: 200,
      data: result.data,
      ok: true,
    });
};


export const logout = (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  return res.status(200).json({
    message: 'Logout successful',
    status: 200,
    ok: true,
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshTokenValue = req.cookies.refreshToken;
  if (!refreshTokenValue) {
    return res.status(401).json({
      message: 'No refresh token provided',
      status: 401,
      ok: false,
    });
  }

  try {
    const newAccessToken = await refreshAccessToken(refreshTokenValue);
    res.cookie('accessToken', newAccessToken, { httpOnly: true });
    return res.status(200).json({
      message: 'Access token refreshed successfully',
      status: 200,
      ok: true,
    });
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid refresh token',
      status: 403,
      ok: false,
    });
  }

};