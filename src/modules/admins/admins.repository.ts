import { db } from '../../config/db.js';

export interface AdminRecord {
    id: number;
    email: string;
    password_hash: string;
    role: 'super_admin' | 'editor';
    last_login?: string | null;
    created_at: string;
}

export async function findAdminByEmail(email: string): Promise<AdminRecord | null> {
    const [rows] = await db.query('SELECT id, email, password_hash, role, last_login, created_at FROM admins WHERE email = ?', [email]);
    const results = rows as AdminRecord[];
    return results[0] ?? null;
}

export async function insertAdmin(data: {
    email: string;
    password_hash: string;
    role: 'super_admin' | 'editor';
}) {
    const [result] = await db.query(
        'INSERT INTO admins (email, password_hash, role) VALUES (?, ?, ?)',
        [data.email, data.password_hash, data.role],
    );
    const insertResult = result as { insertId: number };
    return insertResult.insertId;
}