import { Router } from 'express';
import { portfolioPlaceholderController } from './portfolio.controller.js';

const router = Router();

router.get('/', portfolioPlaceholderController);
router.post('/', portfolioPlaceholderController);

export default router;
