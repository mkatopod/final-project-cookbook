import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createIngredient, getAllIngredients, getIngredientById, updateIngredient, deleteIngredient } from '../controllers/ingredientController.js';

const router = express.Router();

router.post('/', authenticate, createIngredient);
router.get('/', authenticate, getAllIngredients);
router.get('/:id', authenticate, getIngredientById);
router.put('/:id', authenticate, updateIngredient);
router.delete('/:id', authenticate, deleteIngredient);

export default router;