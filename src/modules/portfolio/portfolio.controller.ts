import { Request, Response } from 'express';

export async function portfolioPlaceholderController(_req: Request, res: Response) {
    return res.status(501).json({ success: false, error: 'Portfolio module not implemented yet' });
}
