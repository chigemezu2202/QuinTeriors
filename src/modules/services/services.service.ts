import * as repo from './services.repository.js';

export async function createService(data: {
    name: string;
    slug: string;
    description?: string | null;
    image_url?: string | null;
    is_featured?: boolean;
}) {
    const id = await repo.createService(data);
    return { id, ...data };
}

export async function getServices(options: { page: number; limit: number; category?: string | undefined }) {
    return repo.findServices(options);
}

export async function updateService(id: number, data: {
    name?: string;
    slug?: string;
    description?: string | null;
    image_url?: string | null;
    is_featured?: boolean;
}) {
    return repo.updateService(id, data);
}

export async function removeService(id: number) {
    return repo.deleteService(id);
}
