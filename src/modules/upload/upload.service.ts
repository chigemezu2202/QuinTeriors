import * as repo from './upload.repository.js';

export async function createUpload(data: {
    file_name: string;
    file_url: string;
    file_type: string;
    uploaded_by?: number | null;
}) {
    const id = await repo.createUpload(data);
    return { id, ...data };
}