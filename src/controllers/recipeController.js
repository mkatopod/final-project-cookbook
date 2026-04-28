import * as recipeService from '../services/recipeService.js';

export async function getAllRecipes(req, res) {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getRecipeById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const recipe = await recipeService.getRecipeById(id);
        res.status(200).json(recipe);
    } catch (err) {
        if (err.code === 'INVALID_RECIPE_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'RECIPE_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createRecipe(req, res) {
    try {
        const { title, instructions } = req.body;
        const newRecipe = await recipeService.createRecipe({ title, instructions, id: req.user.id });
        res.status(201).json(newRecipe);
    } catch (err) {
        if (err.code === 'INVALID_RECIPE_DATA') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateRecipe(req, res) {
    try {
        const id = parseInt(req.params.id);
        const recipe = await recipeService.getRecipeById(id);
        
        if (recipe.id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You cannot edit this recipe.' });
        }
        
        const { title, instructions } = req.body;
        const updatedRecipe = await recipeService.updateRecipe(id, { title, instructions });
        res.status(200).json(updatedRecipe);
    } catch (err) {
        if (err.code === 'INVALID_RECIPE_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'RECIPE_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        if (err.code === 'INVALID_RECIPE_DATA') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteRecipe(req, res) {
    try {
        const id = parseInt(req.params.id);
        const recipe = await recipeService.getRecipeById(id);
        
        if (recipe.id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You cannot delete this recipe.' });
        }
        
        const result = await recipeService.deleteRecipe(id);
        res.status(200).json(result);
    } catch (err) {
        if (err.code === 'INVALID_RECIPE_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'RECIPE_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}