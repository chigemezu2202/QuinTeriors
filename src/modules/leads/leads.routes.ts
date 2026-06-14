import { Router } from 'express';
import {
    getLeadByIdController, deleteLeadController, createLeadController, getLeadsController, updateLeadController
} from './leads.controller.js';
import { leadsRateLimiter } from '../../middlewares/rateLimit.js';
import { validateSchema } from '../../middlewares/validate.js';
import { z } from 'zod';

const router = Router();

const createLeadSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        phone: z.string().min(7),
        email: z.string().email().optional(),
        message: z.string().optional(),
        service_id: z.number().int().positive().optional(),
    }),
});

const updateLeadSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        phone: z.string().min(7).optional(),
        email: z.string().email().optional(),
        message: z.string().optional(),
        service_id: z.number().int().positive().optional(),
        status: z.enum(['new', 'contacted', 'closed']).optional(),
    }),
    params: z.object({
        id: z.string().regex(/^[0-9]+$/),
    }),
});

// router.post('/', leadsRateLimiter, validateSchema(createLeadSchema), createLeadController);
// router.get('/', getLeadsController);
// router.put('/:id', validateSchema(updateLeadSchema), updateLeadController);

router.post('/', leadsRateLimiter, validateSchema(createLeadSchema), createLeadController);

router.get('/', getLeadsController);

router.get('/:id', getLeadByIdController);

router.patch('/:id', validateSchema(updateLeadSchema), updateLeadController);

router.delete('/:id', deleteLeadController);

export default router;