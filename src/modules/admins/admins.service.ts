import bcrypt from 'bcrypt';
import { findAdminByEmail, insertAdmin } from './admins.repository.js';

export async function registerAdmin(data: {
    email: string;
    password: string;
    role: 'super_admin' | 'editor';
}) {
    const normalizedEmail = data.email.toLowerCase();
    const existingAdmin = await findAdminByEmail(normalizedEmail);
    if (existingAdmin) {
        throw new Error('Admin with that email already exists');
    }

    const password_hash = await bcrypt.hash(data.password, 12);
    const id = await insertAdmin({
        email: normalizedEmail,
        password_hash,
        role: data.role,
    });

    return { id, email: normalizedEmail, role: data.role };
}