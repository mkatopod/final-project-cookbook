import * as recipeRepo from '../repositories/recipeRepo.js';

export async function getAllRecipes() {
    return await recipeRepo.getAllRecipes();
}

export async function getRecipeById(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_RECIPE_ID', message: 'Recipe ID must be a positive integer.' };
    }
    const recipe = await recipeRepo.getRecipeById(id);
    if (!recipe) {
        throw { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found.' };
    }
    return recipe;
}

export async function createRecipe(data) {
    if (!data.title || !data.instructions) {
        throw { code: 'INVALID_RECIPE_DATA', message: 'Title and instructions are required.' };
    }
    return await recipeRepo.createRecipe(data);
}

export async function updateRecipe(id, data) {
    if (!data.title) {
        throw { code: 'INVALID_RECIPE_DATA', message: 'Title must be provided.' };
    }
    const existing = await recipeRepo.getRecipeById(id);
    if (!existing) {
        throw { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found.' };
    }
    return recipeRepo.updateRecipe(id, data);
}

export async function deleteRecipe(id) {
    if (!Number.isInteger(id) || id <= 0) {
        throw { code: 'INVALID_RECIPE_ID', message: 'Recipe ID must be a positive integer.' };
    }
    const existing = await recipeRepo.getRecipeById(id);
    if (!existing) {
        throw { code: 'RECIPE_NOT_FOUND', message: 'Recipe not found.' };
    }
    await recipeRepo.deleteRecipe(id);
    return { recipe_id: id, message: 'Recipe has been deleted.' };
}
