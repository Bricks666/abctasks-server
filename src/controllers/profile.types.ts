import { UnReadonly } from '@/interfaces/common';
import { RequestWithUser } from '@/interfaces/request';
import { SecureUserModel } from '@/models';

export interface ProfileResponse {
	readonly user: SecureUserModel;
}

export interface UpdateProfileRequest
	extends RequestWithUser,
		Omit<UnReadonly<SecureUserModel>, 'userId'> {}
