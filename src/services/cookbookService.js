import * as cookbookRepo from '../repositories/cookbookRepo.js';

export async function getAllCookbooks() {
    return cookbookRepo.getAllCookbooks();
}

export async function getCookbookById(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_COOKBOOK_ID', message: 'Cook book ID must be a positive integer.' };
    }
    const cookbook = await cookbookRepo.getCookbookById(id);
    if (!cookbook) {
        throw { code: 'COOKBOOK_NOT_FOUND', message: 'Cook book not found.' };
    }
    return cookbook;
}

export async function createCookbook(data) {
    if (!data.date || !data.name) {
        throw { code: 'INVALID_COOKBOOK_DATA', message: 'Data and name are required.' };
    }
    return cookbookRepo.createCookbook(data);
}

export async function updateCookbook(id, data) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_COOKBOOK_ID', message: 'Cook book ID must be a positive integer.' };
    }
    if (!data.name && !data.date) {
        throw { code: 'INVALID_COOKBOOK_DATA', message: 'Name cannot be empty.' };
    }
    const existing = await cookbookRepo.getCookbookById(id);
    if (!existing) {
        throw { code: 'COOKBOOK_NOT_FOUND', message: 'Cook book not found.' };
    }
    return cookbookRepo.updateCookbook(id, data);
}

export async function deleteCookbook(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_COOKBOOK_ID', message: 'Cook book ID must be a positive integer.' };
    }
    const existing = await cookbookRepo.getCookbookById(id);
    if (!existing) {
        throw { code: 'COOKBOOK_NOT_FOUND', message: 'Cook book not found.' };
    }
    await cookbookRepo.deleteCookbook(id);
    return { cookbook_id: id, message: 'The cook book has been deleted.' };
}