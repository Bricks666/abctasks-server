import { validationCheck } from '@/middlewares';
import { COOKIE_NAME } from '@/config';
import { cookie, body } from 'express-validator';
import { Router } from 'express';
import { AuthController } from '@/controllers';

const authRoutes = Router();

authRoutes.get(
	'/',
	cookie(COOKIE_NAME).isString(),
	validationCheck(),
	AuthController.authentication
);
authRoutes.put(
	'/registration',
	body('login').notEmpty(),
	body('password').notEmpty(),
	validationCheck(),
	AuthController.registration
);
authRoutes.post(
	'/login',
	body('login').notEmpty(),
	body('password').notEmpty(),
	validationCheck(),
	AuthController.login
);
authRoutes.delete(
	'/logout',
	cookie(COOKIE_NAME),
	validationCheck(),
	AuthController.logout
);
authRoutes.get(
	'/refresh',
	cookie(COOKIE_NAME),
	validationCheck(),
	AuthController.refresh
);

export { authRoutes };
