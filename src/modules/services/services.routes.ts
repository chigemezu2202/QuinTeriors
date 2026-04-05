import { Router } from 'express';
import {
    createServiceController,
    getServicesController,
    updateServiceController,
    deleteServiceController,
} from './services.controller.js';
import { validateSchema } from '../../middlewares/validate.js';
import { z } from 'zod';

const router = Router();

const serviceBodySchema = z.object({
    body: z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        image_url: z.string().url().optional(),
        is_featured: z.boolean().optional(),
    }),
});

const serviceUpdateSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().optional(),
        image_url: z.string().url().optional(),
        is_featured: z.boolean().optional(),
    }),
});

router.get('/', getServicesController);
router.post('/', validateSchema(serviceBodySchema), createServiceController);
router.put('/:id', validateSchema(serviceUpdateSchema), updateServiceController);
router.delete('/:id', deleteServiceController);

export default router;
