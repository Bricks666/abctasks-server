import { Router } from 'express';
import { header, param } from 'express-validator';
import { accessVerify, validationCheck } from '@/middlewares';
import { ActivitiesController } from '@/controllers';

const activityRoutes = Router();

activityRoutes.get(
	'/:roomId',
	header('authorization').isString(),
	accessVerify(),
	param('roomId', 'Room id must be provided').isInt({
		min: 0,
	}),
	validationCheck(),
	ActivitiesController.getActivities
);
activityRoutes.get(
	'/:roomId/subscribe',
	header('authorization').isString(),
	accessVerify(),
	param('roomId', 'Room id must be provided')
		.isInt({
			min: 0,
		})
		.toInt(),
	validationCheck(),
	ActivitiesController.subscribeNewActivities
);

export { activityRoutes };
