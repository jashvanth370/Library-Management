export interface User {
  id: number;
  username: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterDto {
  username: string;
  password?: string;
}

export interface LoginDto {
  username: string;
  password?: string;
}
