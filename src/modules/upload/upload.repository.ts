import { db } from '../../config/db.js';

export interface UploadRecord {
    id: number;
    file_name: string;
    file_url: string;
    file_type: string;
    uploaded_by?: number | null;
    created_at: string;
}

export async function createUpload(data: {
    file_name: string;
    file_url: string;
    file_type: string;
    uploaded_by?: number | null;
}) {
    const [result] = await db.query(
        'INSERT INTO uploads (file_name, file_url, file_type, uploaded_by) VALUES (?, ?, ?, ?)',
        [data.file_name, data.file_url, data.file_type, data.uploaded_by],
    );
    const insertResult = result as { insertId: number };
    return insertResult.insertId;
}