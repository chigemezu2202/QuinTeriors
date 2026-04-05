import { Request, Response } from 'express';
import { authenticateAdmin, getAdminProfile, logoutAdmin } from './auth.service.js';
import { errorResponse, successResponse } from '../../utils/http.js';
import { AuthRequest } from '../../middlewares/auth.js';

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body as { email: string; password: string };
        const result = await authenticateAdmin(email, password);

        if (!result) {
            return errorResponse(res, 'Invalid email or password', 401);
        }

        return successResponse(res, result);
    } catch (error) {
        return errorResponse(res, 'Unable to authenticate admin');
    }
}

export async function meController(req: AuthRequest, res: Response) {
    try {
        const admin = await getAdminProfile(req.admin?.id ?? 0);
        if (!admin) {
            return errorResponse(res, 'Admin not found', 404);
        }

        return successResponse(res, { id: admin.id, email: admin.email, role: admin.role });
    } catch (error) {
        return errorResponse(res, 'Unable to load profile');
    }
}

export async function logoutController(req: AuthRequest, res: Response) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return errorResponse(res, 'Authorization token is missing', 401);
        }

        const token = authHeader.slice(7);
        const deleted = await logoutAdmin(token);

        if (!deleted) {
            return errorResponse(res, 'Token not found or already expired', 404);
        }

        return successResponse(res, { message: 'Logged out successfully' });
    } catch (error) {
        return errorResponse(res, 'Unable to logout');
    }
}
