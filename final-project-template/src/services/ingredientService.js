import * as ingredientRepo from '../repositories/ingredientRepo.js';

export async function getAllIngredients() {
    return ingredientRepo.getAllIngredients();
}

export async function getIngredientById(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_INGREDIENT_ID', message: 'Ingredient ID must be a positive integer.' };
    }
    const ingredient = await ingredientRepo.getIngredientById(id);
    if (!ingredient) {
        throw { code: 'INGREDIENT_NOT_FOUND', message: 'Ingredient not found.' };
    }
    return ingredient;
}

export async function createIngredient(data) {
    if (!data.name || !data.category) {
        throw { code: 'INVALID_INGREDIENT_DATA', message: 'One of the fields is missing and need to be filled out.' };
    }
    const existing = await ingredientRepo.findIngredientByName(data.name);
    if (existing) {
        throw { code: 'INGREDIENT_EXISTS', message: 'Ingredient already exists.' };
    }
    return ingredientRepo.createIngredient(data);
}

export async function updateIngredient(id, data) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_INGREDIENT_ID', message: 'Ingredient ID must be a positive integer.' };
    }
    if (!data.name && !data.category) {
        throw { code: 'INVALID_INGREDIENT_DATA', message: 'Entered input cannot be empty' };
    }
    const existing = await ingredientRepo.getIngredientById(id);
    if (!existing) {
        throw { code: 'INGREDIENT_NOT_FOUND', message: 'Ingredient not found.' };
    }
    return ingredientRepo.updateIngredient(id, data);
}

export async function deleteIngredient(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_INGREDIENT_ID', message: 'Ingredient ID must be a positive integer.' };
    }
    const existing = await ingredientRepo.getIngredientById(id);
    if (!existing) {
        throw { code: 'INGREDIENT_NOT_FOUND', message: 'Ingredient not found.' };
    }
    await ingredientRepo.deleteIngredient(id);
    return { ingredient_id: id, message: 'The ingredient has been deleted.' };
}