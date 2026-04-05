import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/http.js';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error(err);
    return errorResponse(res, message, 500);
}
