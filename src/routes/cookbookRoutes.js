import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createCookbook, getAllCookbooks, getCookbookById, updateCookbook, deleteCookbook } from '../controllers/cookbookController.js';

const router = express.Router();

router.post('/', createCookbook);
//router.post('/', authenticate, createCookbook);
router.get('/', authenticate, getAllCookbooks);
router.get('/:id', authenticate, getCookbookById);
router.put('/:id', authenticate, updateCookbook);
router.delete('/:id', authenticate, deleteCookbook);

export default router;