import { Response } from 'express';

export function successResponse(res: Response, data: unknown, status = 200) {
    return res.status(status).json({ success: true, data });
}

export function errorResponse(res: Response, message: string, status = 400) {
    return res.status(status).json({ success: false, error: message });
}
