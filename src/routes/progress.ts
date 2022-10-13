import { Router } from 'express';
import { ProgressControllers } from '@/controllers';

const progressRoutes = Router();

progressRoutes.get('/:roomId', ProgressControllers.getTasksProgress);
progressRoutes.get(
	'/:roomId/subscribe',
	ProgressControllers.subscribeChangeProgress
);

export { progressRoutes };
