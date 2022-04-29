export interface RegistrationRequest {
	readonly password: string;
	readonly login: string;
	readonly photo?: string;
}
export interface LoginRequest {
	readonly login: string;
	readonly password: string;
	readonly remember: boolean;
}

export interface TokensResponse  {
  readonly accessToken: string;
  readonly refreshToken: string
}
