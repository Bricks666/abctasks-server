import { CreateUserDto, SecurityUserDto } from '@/users/dto';
import { LoginDto } from '../../dto';

export interface AuthenticationParams {
	readonly token: string;
}

export interface RegistrationParams extends CreateUserDto {}

export interface ActivateParams {
	readonly token: string;
}

export interface LoginParams extends LoginDto {}

export interface RefreshParams {
	readonly token: string;
}

export interface GenerateTokenParams extends SecurityUserDto {}

export interface VerifyUserParams {
	readonly token: string;
}
