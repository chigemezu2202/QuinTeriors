import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findAdminByEmail, findAdminById, saveAuthToken, deleteAuthToken } from './auth.repository.js';
import { jwtExpiry, jwtSecret } from '../../config/jwt.js';

export async function authenticateAdmin(email: string, password: string) {
    const admin = await findAdminByEmail(email);
    if (!admin) return null;

    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) return null;

    const token = (jwt.sign as any)({ adminId: admin.id }, jwtSecret, { expiresIn: jwtExpiry });

    // Save token to database
    await saveAuthToken(admin.id, token, jwtExpiry);

    return {
        token,
        admin: {
            id: admin.id,
            email: admin.email,
            role: admin.role,
        },
    };
}

export async function getAdminProfile(adminId: number) {
    return findAdminById(adminId);
}

export async function logoutAdmin(token: string) {
    return deleteAuthToken(token);
}
