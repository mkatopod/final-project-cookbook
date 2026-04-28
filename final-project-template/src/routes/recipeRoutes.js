import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles, authorizeOwnerOrAdmin } from '../middleware/authorizeRoles.js';
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe} from '../controllers/recipeController.js';

const router = express.Router();


router.post('/', authenticate, createRecipe);
router.get('/', authenticate, authorizeRoles('user', 'admin'), getAllRecipes);
router.get('/:id', authenticate, getRecipeById);
router.put('/:id', authenticate, authorizeOwnerOrAdmin('user_id'), updateRecipe);
router.delete('/:id', authenticate, authorizeOwnerOrAdmin('user_id'), deleteRecipe);

export default router;
