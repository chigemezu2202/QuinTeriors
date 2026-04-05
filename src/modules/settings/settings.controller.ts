import { Request, Response } from 'express';
import { getSettings, updateSettings } from './settings.service.js';
import { errorResponse, successResponse } from '../../utils/http.js';

export async function getSettingsController(_req: Request, res: Response) {
    try {
        const settings = await getSettings();
        if (!settings) {
            return errorResponse(res, 'Settings not found', 404);
        }

        return successResponse(res, settings);
    } catch (error) {
        return errorResponse(res, 'Unable to load settings');
    }
}

export async function updateSettingsController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id) || id < 1) {
            return errorResponse(res, 'Invalid settings id', 400);
        }

        const payload = req.body as {
            site_name?: string;
            tagline?: string;
            headline?: string;
            sub_headline?: string;
            phone?: string;
            whatsapp?: string;
            email?: string;
            address?: string;
            city?: string;
            state?: string;
            country?: string;
            facebook_url?: string;
            tiktok_url?: string;
            business_hours_weekdays?: string;
            business_hours_saturday?: string;
        };

        const updated = await updateSettings(id, payload);
        if (!updated) {
            return errorResponse(res, 'No settings updated or settings not found', 404);
        }

        return successResponse(res, { id, ...payload });
    } catch (error) {
        return errorResponse(res, 'Unable to update settings');
    }
}
