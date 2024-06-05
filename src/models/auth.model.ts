export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResetPasswordAuthenticateRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
}
