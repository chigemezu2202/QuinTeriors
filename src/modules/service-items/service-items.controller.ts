import { Request, Response } from 'express';

export async function serviceItemsPlaceholderController(_req: Request, res: Response) {
    return res.status(501).json({ success: false, error: 'Service-items module not implemented yet' });
}