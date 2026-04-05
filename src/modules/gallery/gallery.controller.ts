import { Request, Response } from 'express';

export async function galleryPlaceholderController(_req: Request, res: Response) {
    return res.status(501).json({ success: false, error: 'Gallery module not implemented yet' });
}
