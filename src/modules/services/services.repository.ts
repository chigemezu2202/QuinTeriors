import { db } from '../../config/db.js';

export interface ServiceRecord {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    image_url?: string | null;
    is_featured: number;
    created_at: string;
    updated_at: string;
}

export async function createService(data: {
    name: string;
    slug: string;
    description?: string | null;
    image_url?: string | null;
    is_featured?: boolean;
}) {
    const [result] = await db.query(
        'INSERT INTO services (name, slug, description, image_url, is_featured) VALUES (?, ?, ?, ?, ?)',
        [data.name, data.slug, data.description, data.image_url, data.is_featured ? 1 : 0],
    );
    const insertResult = result as { insertId: number };
    return insertResult.insertId;
}

export async function findServices(options: {
    page: number;
    limit: number;
    category?: string | undefined;
}) {
    const offset = (options.page - 1) * options.limit;
    const filters: string[] = [];
    const values: Array<string | number> = [];

    if (options.category) {
        filters.push('(name LIKE ? OR description LIKE ?)');
        values.push(`%${options.category}%`, `%${options.category}%`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const [rows] = await db.query(
        `SELECT id, name, slug, description, image_url, is_featured, created_at, updated_at FROM services ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [...values, options.limit, offset],
    );

    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM services ${whereClause}`, values);
    const countResult = (countRows as Array<{ total: number }>)[0] || { total: 0 };

    return {
        items: rows as ServiceRecord[],
        total: countResult.total,
        page: options.page,
        limit: options.limit,
    };
}

export async function updateService(id: number, data: {
    name?: string;
    slug?: string;
    description?: string | null;
    image_url?: string | null;
    is_featured?: boolean;
}) {
    const assignments: string[] = [];
    const values: Array<string | number | null> = [];

    if (data.name !== undefined) {
        assignments.push('name = ?');
        values.push(data.name);
    }
    if (data.slug !== undefined) {
        assignments.push('slug = ?');
        values.push(data.slug);
    }
    if (data.description !== undefined) {
        assignments.push('description = ?');
        values.push(data.description);
    }
    if (data.image_url !== undefined) {
        assignments.push('image_url = ?');
        values.push(data.image_url);
    }
    if (data.is_featured !== undefined) {
        assignments.push('is_featured = ?');
        values.push(data.is_featured ? 1 : 0);
    }

    if (assignments.length === 0) {
        return false;
    }

    values.push(id);
    const [result] = await db.query(`UPDATE services SET ${assignments.join(', ')} WHERE id = ?`, values);
    const updateResult = result as { affectedRows: number };
    return updateResult.affectedRows > 0;
}

export async function deleteService(id: number) {
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
    const deleteResult = result as { affectedRows: number };
    return deleteResult.affectedRows > 0;
}
