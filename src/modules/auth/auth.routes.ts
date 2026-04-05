import { Router } from 'express';
import { loginController, meController, logoutController } from './auth.controller.js';
import { authorize } from '../../middlewares/auth.js';
import { validateSchema } from '../../middlewares/validate.js';
import { z } from 'zod';
import { loginRateLimiter } from '../../middlewares/rateLimit.js';

const router = Router();

const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
    }),
});

router.post('/login', loginRateLimiter, validateSchema(loginSchema), loginController);
router.get('/me', authorize, meController);
router.post('/logout', authorize, logoutController);

export default router;
