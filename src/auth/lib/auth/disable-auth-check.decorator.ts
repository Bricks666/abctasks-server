import { applyDecorators, SetMetadata } from '@nestjs/common';
import { DISABLE_AUTH_CHECK_FLAG } from './config';

export const DisableAuthCheck = () => {
	return applyDecorators(SetMetadata(DISABLE_AUTH_CHECK_FLAG, true));
};
