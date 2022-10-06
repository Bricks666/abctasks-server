import { Router } from 'express';
import { ProfileControllers } from '@/controllers';
import { accessVerify, fileUpload, validationCheck } from '@/middlewares';
import { header } from 'express-validator';

const profileRoutes = Router();

profileRoutes.get(
	'/',
	header('authorization').isString(),
	accessVerify(),
	validationCheck(),
	ProfileControllers.getProfile
);
profileRoutes.post(
	'/update',
	header('authorization').isString(),
	accessVerify(),
	validationCheck(),
	fileUpload(),
	ProfileControllers.updateProfile
);

export { profileRoutes };
