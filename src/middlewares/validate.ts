import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';
import { errorResponse } from '../utils/http.js';

export function validateSchema(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (!result.success) {
            const message = result.error.issues.map((err: any) => `${err.path.join('.')} ${err.message}`).join(', ');
            return errorResponse(res, message, 422);
        }

        return next();
    };
}
