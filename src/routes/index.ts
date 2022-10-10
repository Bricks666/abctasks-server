import { Router } from 'express';

import { activityRoutes } from './activity';
import { progressRoutes } from './progress';

const appRoutes = Router();

appRoutes.use('/activities', activityRoutes);
appRoutes.use('/progress', progressRoutes);

export { appRoutes };
