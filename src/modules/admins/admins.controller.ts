import { Request, Response } from 'express';
import { registerAdmin } from './admins.service.js';
import { errorResponse, successResponse } from '../../utils/http.js';

export enum UserRole {
    super_admin = "super_admin",
    editor = "editor",
}
export async function registerAdminController(req: Request, res: Response) {
    try {
        const payload = req.body as {
            email: string;
            password: string;
            role: UserRole;
        };

        const admin = await registerAdmin({
            email: payload.email,
            password: payload.password,
            role: payload.role
        });

        return successResponse(res, admin, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to register admin';
        return errorResponse(res, message, message.includes('already exists') ? 409 : 400);
    }
}
