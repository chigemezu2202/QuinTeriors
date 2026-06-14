import { Request, Response } from 'express';
import * as leadService from './leads.service.js';
import { errorResponse, successResponse } from '../../utils/http.js';

export async function createLeadController(req: Request, res: Response) {
    try {
        const payload = req.body as {
            name: string;
            phone: string;
            email?: string;
            message?: string;
            service_id?: number;
        };

        const lead = await leadService.createLead({
            ...payload,
            ip_address: req.ip ?? null,
            user_agent: req.headers['user-agent'] ?? null,
        });

        return successResponse(res, lead, 201);
    } catch (error) {
        return errorResponse(res, 'Unable to create lead');
    }
}

export async function getLeadsController(req: Request, res: Response) {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);
        const status = typeof req.query.status === 'string' ? req.query.status : undefined;

        const leads = await leadService.getLeads({
            page: Number.isNaN(page) || page < 1 ? 1 : page,
            limit: Number.isNaN(limit) || limit < 1 ? 10 : limit,
            status,
        });

        return successResponse(res, leads);
    } catch (error) {
        return errorResponse(res, 'Unable to fetch leads');
    }
}

export async function getLeadByIdController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id) || id < 1) {
            return errorResponse(res, 'Invalid lead id', 400);
        }

        const lead = await leadService.getLeadById(id);

        if (!lead) {
            return errorResponse(res, 'Lead not found', 404);
        }

        return successResponse(res, lead);
    } catch (error) {
        return errorResponse(res, 'Unable to fetch lead');
    }
}

export async function updateLeadController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id) || id < 1) {
            return errorResponse(res, 'Invalid lead id', 400);
        }

        const existingLead = await leadService.getLeadById(id);

        if (!existingLead) {
            return errorResponse(res, 'Lead not found', 404);
        }

        const payload = req.body as {
            name?: string;
            phone?: string;
            email?: string;
            message?: string;
            service_id?: number;
            status?: 'new' | 'contacted' | 'closed';
        };

        const updated = await leadService.updateLead(id, payload);

        if (!updated) {
            return errorResponse(res, 'No changes provided', 400);
        }

        const updatedLead = await leadService.getLeadById(id);

        return successResponse(res, updatedLead);
    } catch (error) {
        return errorResponse(res, 'Unable to update lead');
    }
}

export async function deleteLeadController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id) || id < 1) {
            return errorResponse(res, 'Invalid lead id', 400);
        }

        const deleted = await leadService.deleteLead(id);

        if (!deleted) {
            return errorResponse(res, 'Lead not found', 404);
        }

        return successResponse(res, {
            message: 'Lead deleted successfully',
        });
    } catch (error) {
        return errorResponse(res, 'Unable to delete lead');
    }
}