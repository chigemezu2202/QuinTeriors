import * as repo from './leads.repository.js';

export async function createLead(data: {
    name: string;
    phone: string;
    email?: string | null;
    message?: string | null;
    service_id?: number | null;
    ip_address?: string | null;
    user_agent?: string | null;
}) {
    const id = await repo.insertLead(data);
    console.log({ id, ...data, status: 'new' })
    return { id, ...data, status: 'new' };
}

export async function getLeads(options: { page: number; limit: number; status?: string | undefined }) {
    return repo.findLeads(options);
}

export async function getLeadById(id: number) {
    return repo.findLeadById(id);
}

export async function deleteLead(id: number) {
    return repo.deleteLead(id);
}

export async function updateLead(id: number, data: {
    name?: string;
    phone?: string;
    email?: string | null;
    message?: string | null;
    service_id?: number | null;
    status?: 'new' | 'contacted' | 'closed';
}) {
    const updated = await repo.updateLead(id, data);
    return updated;
}

// Add Restore  Service
export async function restoreLead(id: number) {
    return repo.restoreLead(id);
}

// Add Trash Service 
export async function getDeletedLeads() {
    return repo.findDeletedLeads();
}
