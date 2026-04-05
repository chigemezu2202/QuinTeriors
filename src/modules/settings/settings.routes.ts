import { Router } from 'express';
import { getSettingsController, updateSettingsController } from './settings.controller.js';
import { authorize } from '../../middlewares/auth.js';
import { validateSchema } from '../../middlewares/validate.js';
import { z } from 'zod';

const router = Router();

const updateSchema = z.object({
    body: z.object({
        site_name: z.string().optional(),
        tagline: z.string().optional(),
        headline: z.string().optional(),
        sub_headline: z.string().optional(),
        phone: z.string().optional(),
        whatsapp: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        facebook_url: z.string().optional(),
        tiktok_url: z.string().optional(),
        business_hours_weekdays: z.string().optional(),
        business_hours_saturday: z.string().optional(),
    }),
});

router.get('/', getSettingsController);
router.put('/:id', authorize, validateSchema(updateSchema), updateSettingsController);

export default router;