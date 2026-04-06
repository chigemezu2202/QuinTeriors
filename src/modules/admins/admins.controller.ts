import { Response } from 'express';
import { registerAdmin } from './admins.service.js';
import { errorResponse, successResponse } from '../../utils/http.js';
import { UserRole } from '../../types/index.js';
import { AuthRequest } from '../../middlewares/auth.js';

// Helper: Validate and normalize role against UserRole enum
function validateRole(role: unknown): UserRole {
    const validRoles = Object.values(UserRole);
    if (typeof role === 'string' && validRoles.includes(role as UserRole)) {
        return role as UserRole;
    }
    throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
}

export async function registerAdminController(req: AuthRequest, res: Response) {
    try {
        // Ensure caller is authenticated
        if (!req.admin) {
            return errorResponse(res, 'Authentication required', 401);
        }

        const email = req.body?.email;
        const password = req.body?.password;
        let role = req.body?.role;

        // Validate email and password (required fields)
        if (!email || typeof email !== 'string') {
            return errorResponse(res, 'Email is required', 400);
        }
        if (!password || typeof password !== 'string') {
            return errorResponse(res, 'Password is required', 400);
        }

        // Default role to 'editor'
        if (role === undefined) {
            role = UserRole.editor;
        } else {
            // Validate role against UserRole enum
            try {
                role = validateRole(role);
            } catch (error) {
                return errorResponse(res, error instanceof Error ? error.message : 'Invalid role', 400);
            }
        }

        // Authorization check: only super_admin can create super_admin accounts
        if (role === UserRole.super_admin && req.admin.role !== UserRole.super_admin) {
            return errorResponse(res, 'Only super_admin can create super_admin accounts', 403);
        }

        const admin = await registerAdmin({
            email,
            password,
            role
        });

        return successResponse(res, admin, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to register admin';
        return errorResponse(res, message, message.includes('already exists') ? 409 : 400);
    }
}
