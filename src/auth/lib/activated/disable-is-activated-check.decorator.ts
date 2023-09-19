import { applyDecorators, SetMetadata } from '@nestjs/common';
import { DISABLE_IS_ACTIVATED_FLAG } from './config';

export const DisableIsActivatedCheck = () =>
	applyDecorators(SetMetadata(DISABLE_IS_ACTIVATED_FLAG, true));
