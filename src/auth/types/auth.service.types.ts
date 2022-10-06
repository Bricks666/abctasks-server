import { SecurityUserDto } from '@/users/dto';

export interface Tokens {
	readonly refreshToken: string;
	readonly accessToken: string;
}

export interface AuthenticationResult {
	readonly user: SecurityUserDto;
	readonly tokens: Tokens;
}
