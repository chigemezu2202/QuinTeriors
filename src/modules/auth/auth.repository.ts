import { db } from '../../config/db.js';

export interface AdminRecord {
    id: number;
    email: string;
    password_hash: string;
    role: string;
}

export async function findAdminByEmail(email: string): Promise<AdminRecord | null> {
    const [rows] = await db.query('SELECT id, email, password_hash, role FROM admins WHERE email = ?', [email]);
    const results = rows as AdminRecord[];
    return results[0] ?? null;
}

export async function findAdminById(adminId: number): Promise<Pick<AdminRecord, 'id' | 'email' | 'role'> | null> {
    const [rows] = await db.query('SELECT id, email, role FROM admins WHERE id = ?', [adminId]);
    const results = rows as Array<Pick<AdminRecord, 'id' | 'email' | 'role'>>;
    return results[0] ?? null;
}

export async function saveAuthToken(adminId: number, token: string, expiresIn: string) {
    // Calculate expires_at based on expiresIn (e.g., '7d')
    const expiresAt = new Date();
    const days = parseInt(expiresIn.replace('d', ''));
    expiresAt.setDate(expiresAt.getDate() + days);

    const [result] = await db.query(
        'INSERT INTO auth_tokens (admin_id, token, expires_at) VALUES (?, ?, ?)',
        [adminId, token, expiresAt]
    );
    const insertResult = result as { insertId: number };
    return insertResult.insertId;
}

export async function deleteAuthToken(token: string) {
    const [result] = await db.query('DELETE FROM auth_tokens WHERE token = ?', [token]);
    const deleteResult = result as { affectedRows: number };
    return deleteResult.affectedRows > 0;
}

export async function cleanupExpiredTokens() {
    const [result] = await db.query('DELETE FROM auth_tokens WHERE expires_at < NOW()');
    const deleteResult = result as { affectedRows: number };
    return deleteResult.affectedRows;
}
