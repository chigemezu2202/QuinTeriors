import { Request, Response } from 'express';
import * as serviceService from './services.service.js';
import { errorResponse, successResponse } from '../../utils/http.js';

export async function createServiceController(req: Request, res: Response) {
    try {
        const payload = req.body as {
            name: string;
            slug: string;
            description?: string;
            image_url?: string;
            is_featured?: boolean;
        };

        const service = await serviceService.createService(payload);
        return successResponse(res, service, 201);
    } catch (error) {
        return errorResponse(res, 'Unable to create service');
    }
}

export async function getServicesController(req: Request, res: Response) {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);
        const category = typeof req.query.category === 'string' ? req.query.category : undefined;

        const data = await serviceService.getServices({
            page: Number.isNaN(page) || page < 1 ? 1 : page,
            limit: Number.isNaN(limit) || limit < 1 ? 10 : limit,
            category,
        });

        return successResponse(res, data);
    } catch (error) {
        return errorResponse(res, 'Unable to load services');
    }
}

export async function updateServiceController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id) || id < 1) {
            return errorResponse(res, 'Invalid service id', 400);
        }

        const payload = req.body as {
            name?: string;
            slug?: string;
            description?: string;
            image_url?: string;
            is_featured?: boolean;
        };

        const updated = await serviceService.updateService(id, payload);
        if (!updated) {
            return errorResponse(res, 'Service not found or no changes provided', 404);
        }

        return successResponse(res, { id, ...payload });
    } catch (error) {
        return errorResponse(res, 'Unable to update service');
    }
}

export async function deleteServiceController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id) || id < 1) {
            return errorResponse(res, 'Invalid service id', 400);
        }

        const deleted = await serviceService.removeService(id);
        if (!deleted) {
            return errorResponse(res, 'Service not found', 404);
        }

        return successResponse(res, { id });
    } catch (error) {
        return errorResponse(res, 'Unable to delete service');
    }
}
