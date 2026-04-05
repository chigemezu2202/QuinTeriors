import { db } from '../../config/db.js';

export interface LeadRecord {
    id: number;
    name: string;
    phone: string;
    email?: string | null;
    message?: string | null;
    service_id?: number | null;
    status: 'new' | 'contacted' | 'closed';
    ip_address?: string | null;
    user_agent?: string | null;
    created_at: string;
}

export async function insertLead(data: {
    name: string;
    phone: string;
    email?: string | null;
    message?: string | null;
    service_id?: number | null;
    ip_address?: string | null;
    user_agent?: string | null;
}) {
    const [result] = await db.query(
        'INSERT INTO leads (name, phone, email, message, service_id, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [data.name, data.phone, data.email, data.message, data.service_id, data.ip_address, data.user_agent],
    );
    const insertResult = result as { insertId: number };
    return insertResult.insertId;
}

export async function findLeads(options: {
    page: number;
    limit: number;
    status?: string | undefined;
}) {
    const offset = (options.page - 1) * options.limit;
    const filters: string[] = [];
    const values: Array<string | number> = [];

    if (options.status) {
        filters.push('status = ?');
        values.push(options.status);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const [rows] = await db.query(
        `SELECT id, name, phone, email, message, service_id, status, ip_address, user_agent, created_at FROM leads ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [...values, options.limit, offset],
    );

    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM leads ${whereClause}`, values);
    const countResult = (countRows as Array<{ total: number }>)[0] || { total: 0 };;

    return {
        items: rows as LeadRecord[],
        total: countResult.total,
        page: options.page,
        limit: options.limit,
    };
}

export async function updateLead(id: number, data: {
    name?: string;
    phone?: string;
    email?: string | null;
    message?: string | null;
    service_id?: number | null;
    status?: 'new' | 'contacted' | 'closed';
}) {
    const assignments: string[] = [];
    const values: Array<string | number | null> = [];

    if (data.name !== undefined) {
        assignments.push('name = ?');
        values.push(data.name);
    }
    if (data.phone !== undefined) {
        assignments.push('phone = ?');
        values.push(data.phone);
    }
    if (data.email !== undefined) {
        assignments.push('email = ?');
        values.push(data.email);
    }
    if (data.message !== undefined) {
        assignments.push('message = ?');
        values.push(data.message);
    }
    if (data.service_id !== undefined) {
        assignments.push('service_id = ?');
        values.push(data.service_id);
    }
    if (data.status !== undefined) {
        assignments.push('status = ?');
        values.push(data.status);
    }

    if (assignments.length === 0) {
        return false;
    }

    values.push(id);
    const [result] = await db.query(`UPDATE leads SET ${assignments.join(', ')} WHERE id = ?`, values);
    const updateResult = result as { affectedRows: number };
    return updateResult.affectedRows > 0;
}
