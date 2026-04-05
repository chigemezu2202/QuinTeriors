import { Router } from 'express';
import { uploadImageController, upload } from './upload.controller.js';
import { authorize } from '../../middlewares/auth.js';

const router = Router();

router.post('/image', authorize, upload.single('image'), uploadImageController);

export default router;