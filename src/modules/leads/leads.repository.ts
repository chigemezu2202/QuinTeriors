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
    updated_at?: string | null;
    deleted_at?: string | null;
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
    const filters: string[] = ['deleted_at IS NULL'];
    const values: Array<string | number> = [];

    if (options.status) {
        filters.push('status = ?');
        values.push(options.status);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const [rows] = await db.query(
        `SELECT id, name, phone, email, message, service_id, status, ip_address, user_agent, created_at, updated_at, deleted_at FROM leads ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
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

export async function findLeadById(id: number) {
    const [rows] = await db.query(
        `SELECT id, name, phone, email, message, service_id, status, ip_address, user_agent, created_at 
         FROM leads 
         WHERE id = ?
         AND deleted_at IS NULL
         LIMIT 1`,
        [id],
    );

    const lead = (rows as LeadRecord[])[0];


    return lead || null;
}

export async function deleteLead(id: number) {
    const [result] = await db.query(
        `UPDATE leads SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL`,
        [id],
    );

    const deleteResult = result as { affectedRows: number };

    return deleteResult.affectedRows > 0;
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
    const [result] = await db.query(`UPDATE leads SET ${assignments.join(', ')} WHERE id = ? AND deleted_at IS NULL`, values);
    const updateResult = result as { affectedRows: number };
    return updateResult.affectedRows > 0;
}


// Add Restore Function
export async function restoreLead(id: number) {
    const [result] = await db.query(
        `
        UPDATE leads
        SET
            deleted_at = NULL,
            updated_at = NOW()
        WHERE id = ?
            AND deleted_at IS NOT NULL
        `,
        [id],
    );

    const restoreResult = result as { affectedRows: number };

    return restoreResult.affectedRows > 0;
}

// Add Trash Query
export async function findDeletedLeads(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // 1. Get total count
    const [countRows] = await db.query(
        `
        SELECT COUNT(*) as total
        FROM leads
        WHERE deleted_at IS NOT NULL
        `
    );

    const total = (countRows as any)[0].total;

    // 2. Get paginated data
    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            phone,
            email,
            message,
            service_id,
            status,
            created_at,
            updated_at,
            deleted_at
        FROM leads
        WHERE deleted_at IS NOT NULL
        ORDER BY deleted_at DESC
        LIMIT ? OFFSET ?
        `,
        [limit, offset]
    );

    return {
        items: rows as LeadRecord[],
        total,
    };
}