import { Router } from 'express';
import { testimonialsPlaceholderController } from './testimonials.controller.js';

const router = Router();

router.get('/', testimonialsPlaceholderController);
router.post('/', testimonialsPlaceholderController);

export default router;
