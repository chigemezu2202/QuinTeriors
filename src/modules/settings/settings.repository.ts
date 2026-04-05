import { db } from '../../config/db.js';

export interface SettingsRecord {
    id: number;
    site_name: string;
    tagline?: string | undefined;
    headline?: string | undefined;
    sub_headline?: string | undefined;
    phone?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
    facebook_url?: string | undefined;
    tiktok_url?: string | undefined;
    business_hours_weekdays?: string | undefined;
    business_hours_saturday?: string | undefined;
    created_at: string;
    updated_at: string;
}

export type UpdateSettingsData = Partial<Omit<SettingsRecord, 'id' | 'created_at' | 'updated_at'>>;

export async function findSettings(): Promise<SettingsRecord | null> {
    const [rows] = await db.query('SELECT * FROM settings ORDER BY id LIMIT 1');
    const results = rows as SettingsRecord[];
    return results[0] ?? null;
}

export async function updateSettings(id: number, data: Partial<Omit<SettingsRecord, 'id' | 'created_at' | 'updated_at'>>) {
    const assignments: string[] = [];
    const values: Array<string | number | null> = [];

    const fields: Array<keyof Omit<SettingsRecord, 'id' | 'created_at' | 'updated_at'>> = [
        'site_name',
        'tagline',
        'headline',
        'sub_headline',
        'phone',
        'whatsapp',
        'email',
        'address',
        'city',
        'state',
        'country',
        'facebook_url',
        'tiktok_url',
        'business_hours_weekdays',
        'business_hours_saturday',
    ];

    for (const field of fields) {
        if (field in data) {
            assignments.push(`${field} = ?`);
            values.push(data[field] ?? null);
        }
    }

    if (assignments.length === 0) {
        return false;
    }

    values.push(id);
    const [result] = await db.query(`UPDATE settings SET ${assignments.join(', ')} WHERE id = ?`, values);
    const updateResult = result as { affectedRows: number };
    return updateResult.affectedRows > 0;
}
