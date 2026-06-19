import { db } from '../../config/db.js';
import { FindLeadsOptions } from '../../utils/find-opt.js';
import { column, createLeadsSearchFilter, leadsSortFields } from '../../utils/modules/leads.js';
import { paginate } from '../../utils/paginate.js';
import { buildWhereClause } from '../../utils/query-builder.js';
import { filtersWithNoDeletedItems, filtersWithOnlyDeletedItems } from '../../utils/soft-del-qrys.js';
import { buildSortClause } from '../../utils/sorting.js';

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

export async function findLeads(options: FindLeadsOptions) {
    // *** Add the status filter if the user selected one
    if (options.status) {
        filtersWithNoDeletedItems.push({
            field: "status",
            value: options.status,
        });
    }

    // *** Add the multi-column search group if the user typed a search word
    if (options.search) {
        filtersWithNoDeletedItems.push(createLeadsSearchFilter(options.search));
    }

    //NOTE: *** Build Where Clause Helper Func - *** Returning Where Clause Field, It's Operators and Values Array 
    const { whereClause, values } = buildWhereClause(filtersWithNoDeletedItems);

    //NOTE: *** Build Sort Clause Helper Func - *** Returning Order By Clause Based on User Input and Allowed Fields and Order
    const orderBy = buildSortClause(
        options.sortField,
        options.sortOrder,
        leadsSortFields.allowedFields,
        leadsSortFields.defaultField
    );

    // *** It passes everything safely to your database.
    return paginate<LeadRecord>({
        table: "leads",
        select: `${column()}`,
        whereClause,
        values,
        orderBy,
        page: options.page,
        limit: options.limit,
    });
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
            deleted_at = NULL
        WHERE id = ?
            AND deleted_at IS NOT NULL
        `,
        [id],
    );

    const restoreResult = result as { affectedRows: number };

    return restoreResult.affectedRows > 0;
}

// Add Trash Query
export async function findDeletedLeads(options: FindLeadsOptions) {
    // *** Add the status filter if the user selected one
    if (options.status) {
        filtersWithOnlyDeletedItems.push({
            field: "status",
            value: options.status,
        });
    }

    // *** Add the multi-column search group if the user typed a search word
    if (options.search) {
        filtersWithOnlyDeletedItems.push(createLeadsSearchFilter(options.search));
    }
  
    //NOTE: *** Build Where Clause Helper Func - *** Returning Where Clause Field, It's Operators and Values Array 
    const { whereClause, values } = buildWhereClause(filtersWithOnlyDeletedItems);

    //NOTE: *** Build Sort Clause Helper Func - *** Returning Order By Clause Based on User Input and Allowed Fields and Order
    const orderBy = buildSortClause(
        options.sortField,
        options.sortOrder,
        leadsSortFields.allowedFields,
        leadsSortFields.defaultField
    );

    // *** It passes everything safely to your database.
    return paginate<LeadRecord>({
        table: "leads",
        select: `${column()}`,
        whereClause,
        values,
        orderBy,
        page: options.page,
        limit: options.limit,
    });
}