import { Request, Response } from 'express';

export async function pagesPlaceholderController(_req: Request, res: Response) {
    return res.status(501).json({ success: false, error: 'Pages module not implemented yet' });
}
