import { applyDecorators, SetMetadata } from '@nestjs/common';
import { NO_AUTH_CHECK_FLAG } from './config';

export const NoAuthCheck = () => {
	return applyDecorators(SetMetadata(NO_AUTH_CHECK_FLAG, true));
};
