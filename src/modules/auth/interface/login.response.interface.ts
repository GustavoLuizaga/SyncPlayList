export interface ILoginResponse {
  user_id:   string;
  email:     string;
  username:  string;
  password:  string;
  role: string[];
  token?: string;
}