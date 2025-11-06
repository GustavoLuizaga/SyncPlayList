import jwt from 'jsonwebtoken'

import ENV from '../config/env.config'

export interface IAuthPayload {
  name: string;
  email: string;
  user_id: string;
}

export function generateAccessToken(payload: IAuthPayload) {
  const token = jwt.sign(
    payload,
    ENV.JWT_SECRET,
    {
      expiresIn: '1h',
      algorithm: 'HS256'
    }
  )

  return token;
};

export function decodedToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET ) as { user_id: string };
};