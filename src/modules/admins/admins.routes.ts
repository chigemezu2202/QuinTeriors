import { Router } from 'express';
import { validateSchema } from '../../middlewares/validate.js';
import { z } from 'zod';
import { authorize } from '../../middlewares/auth.js';
import { registerAdminController } from './admins.controller.js';

const router = Router();

const registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
    }),
});

// Admin registration is private: only authenticated CMS admins can create editor accounts.
router.post('/', authorize, validateSchema(registerSchema), registerAdminController);

export default router;
