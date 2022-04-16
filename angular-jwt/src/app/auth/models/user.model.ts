import { Role } from './role.enum';

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  role: Role;
}
