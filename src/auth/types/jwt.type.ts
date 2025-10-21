export interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export interface JwtRequest extends Request{
  user: {
    id: number;
    email: string;
    roles: string[]
  }
}

export type JwtUser = JwtRequest['user'];