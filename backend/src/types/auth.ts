export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface JwtUserPayload {
  id: number;
}
