export interface IAuthResponse {
  user_id: string;
  email: string;
  username: string;
  role: string[];
  accessToken: string;
  refreshToken: string;
}
