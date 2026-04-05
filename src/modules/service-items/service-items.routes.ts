import { Router } from 'express';
import { serviceItemsPlaceholderController } from './service-items.controller.js';

const router = Router();

router.get('/', serviceItemsPlaceholderController);
router.post('/', serviceItemsPlaceholderController);

export default router;