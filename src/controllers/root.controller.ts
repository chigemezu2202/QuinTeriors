import { Request, Response } from 'express';
export const root = async (req: Request, res: Response) => {
    //Hack: Send Api Live Respond From res 
    res.status(200).json({
        message: 'QuinTeriors API is running smoothly 🚀',
        status: 'success',
        environment: process.env.NODE_ENV,
    });
}