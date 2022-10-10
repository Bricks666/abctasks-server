import { Router } from 'express';

import { progressRoutes } from './progress';

const appRoutes = Router();

appRoutes.use('/progress', progressRoutes);

export { appRoutes };
