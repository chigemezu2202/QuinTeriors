import * as repo from './settings.repository.js';

export async function getSettings() {
    return repo.findSettings();
}

export async function updateSettings(id: number, data: repo.UpdateSettingsData) {
    const updated = await repo.updateSettings(id, data);
    return updated;
}
