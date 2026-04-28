import * as ingredientService from '../services/ingredientService.js';

export async function getAllIngredients(req, res) {
    try {
        const ingredients = await ingredientService.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getIngredientById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const ingredient = await ingredientService.getIngredientById(id);
        res.status(200).json(ingredient);
    } catch (err) {
        if (err.code === 'INVALID_INGREDIENT_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'INGREDIENT_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createIngredient(req, res) {
    try {
        const { name, category } = req.body;
        const newIngredient = await ingredientService.createIngredient({ name, category });
        res.status(201).json(newIngredient);
    } catch (err) {
        if (err.code === 'INVALID_INGREDIENT_DATA') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'INGREDIENT_EXISTS') {
            return res.status(409).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateIngredient(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, category } = req.body;
        const updatedIngredient = await ingredientService.updateIngredient(id, { name, category });
        res.status(200).json(updatedIngredient);
    } catch (err) {
        if (err.code === 'INVALID_INGREDIENT_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'INGREDIENT_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        if (err.code === 'INVALID_INGREDIENT_DATA') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteIngredient(req, res) {
    try {
        const id = parseInt(req.params.id);
        const result = await ingredientService.deleteIngredient(id);
        res.status(200).json(result);
    } catch (err) {
        if (err.code === 'INVALID_INGREDIENT_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'INGREDIENT_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}
