import { param, body, header } from 'express-validator';
import { Router } from 'express';
import { validationCheck, accessVerify } from '@/middlewares';
import { TasksController } from '@/controllers';
import { TaskStatus } from '@/models';

const taskRoutes = Router();

taskRoutes.get(
	'/:roomId',
	param('roomId').isInt({
		min: 0,
	}),
	header('authorization').isString(),
	accessVerify(),
	validationCheck(),
	TasksController.getTasks
);
taskRoutes.put(
	'/:roomId/new',
	param('roomId').isInt({
		min: 0,
	}),
	header('authorization').isString(),
	accessVerify(),
	body('content').notEmpty().isString(),
	body('status').isIn(Object.values(TaskStatus)),
	body('groupId').isInt({
		min: 0,
	}),
	validationCheck(),
	TasksController.createTask
);
taskRoutes.delete(
	'/:roomId/:id/delete',
	param('roomId').isInt({
		min: 0,
	}),
	param('id').isInt({
		min: 0,
	}),
	header('authorization').isString(),
	accessVerify(),
	validationCheck(),
	TasksController.deleteTask
);
taskRoutes.post(
	'/:roomId/:id/edit',
	param('roomId').isInt({
		min: 0,
	}),
	param('id').isInt({
		min: 0,
	}),
	header('authorization').isString(),
	accessVerify(),
	body('content').notEmpty().isString(),
	body('status').isIn(Object.values(TaskStatus)),
	body('groupId').isInt({
		min: 0,
	}),
	validationCheck(),
	TasksController.editTask
);

export { taskRoutes };
