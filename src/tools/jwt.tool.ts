import jwt from 'jsonwebtoken'

import ENV from '../config/env.config'

export interface IAuthPayload {
  name: string;
  email: string;
  user_name: string;
  user_id: string;
}

export function generateAccessToken(payload: IAuthPayload) {
  const accessToken = jwt.sign(
    payload,
    ENV.JWT_SECRET,
    {
      expiresIn: '1h',
      algorithm: 'HS256'
    }
  )
  return accessToken;
};

export function generateRefreshToken(payload: IAuthPayload) {
  const refreshToken = jwt.sign(
    payload,
    ENV.JWT_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256'
    }
  )
  return refreshToken;
};

export function decodedToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET) as IAuthPayload;
};