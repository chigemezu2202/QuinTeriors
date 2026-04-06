import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';
import { jwtSecret } from '../constants/jwt.js';
import { errorResponse } from '../utils/http.js';

export interface AuthRequest extends Request {
    admin?: { id: number; email: string; role: string };
}

export async function authorize(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return errorResponse(res, 'Authorization token is missing', 401);
    }

    const token = authHeader.slice(7);

    try {
        const payload = jwt.verify(token, jwtSecret) as { adminId: number };
        const [rows] = await db.query('SELECT id, email, role FROM admins WHERE id = ?', [payload.adminId]);
        const admins = rows as Array<{ id: number; email: string; role: string }>;
        const admin = admins[0];

        if (!admin) {
            return errorResponse(res, 'Invalid token', 401);
        }

        req.admin = { id: admin.id, email: admin.email, role: admin.role };
        return next();
    } catch (error) {
        return errorResponse(res, 'Invalid or expired token', 401);
    }
}
