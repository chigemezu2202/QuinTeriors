import { Router } from 'express';
import { pagesPlaceholderController } from './pages.controller.js';

const router = Router();

router.get('/', pagesPlaceholderController);
router.post('/', pagesPlaceholderController);

export default router;
