export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  dateOfBirthday: Date;
  roles: string[];
  refreshToken: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafeUser extends Omit<User, 'password'> {}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult extends Tokens {
  user: SafeUser;
}