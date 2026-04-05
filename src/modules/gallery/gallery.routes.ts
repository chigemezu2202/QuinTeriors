import { Router } from 'express';
import { galleryPlaceholderController } from './gallery.controller.js';

const router = Router();

router.get('/', galleryPlaceholderController);
router.post('/', galleryPlaceholderController);

export default router;
