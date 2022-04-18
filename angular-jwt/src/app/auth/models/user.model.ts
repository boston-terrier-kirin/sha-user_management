import { Role } from './role.enum';

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}
