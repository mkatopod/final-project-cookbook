import * as cookbookService from '../services/cookbookService.js';

export async function getAllCookbooks(req, res) {
    try {
        const cookbooks = await cookbookService.getAllCookbooks();
        res.status(200).json(cookbooks);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getCookbookById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const cookbook = await cookbookService.getCookbookById(id);
        
        if (cookbook.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You cannot access this cook book.' });
        }
        
        res.status(200).json(cookbook);
    } catch (err) {
        if (err.code === 'INVALID_COOKBOOK_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'COOKBOOK_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createCookbook(req, res) {
    try {
        const { name, date } = req.body;
        const newCookbook = await cookbookService.createCookbook({ name, date, user_id: req.user.id });
        res.status(201).json(newCookbook);
    } catch (err) {
        if (err.code === 'INVALID_COOKBOOK_DATA') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateCookbook(req, res) {
    try {
        const id = parseInt(req.params.id);
        const cookbook = await cookbookService.getCookbookById(id);
        
        if (cookbook.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You cannot edit this cook book.' });
        }
        
        const { name, date } = req.body;
        const updatedCookbook = await cookbookService.updateCookbook(id, { name, date });
        res.status(200).json(updatedCookbook);
    } catch (err) {
        if (err.code === 'INVALID_COOKBOOK_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'COOKBOOK_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        if (err.code === 'INVALID_COOKBOOK_DATA') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteCookbook(req, res) {
    try {
        const id = parseInt(req.params.id);
        const cookbook = await cookbookService.getCookbookById(id);
        
        if (cookbook.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You cannot delete this cook book.' });
        }
        
        const result = await cookbookService.deleteCookbook(id);
        res.status(200).json(result);
    } catch (err) {
        if (err.code === 'INVALID_COOKBOOK_ID') {
            return res.status(400).json({ message: err.message });
        }
        if (err.code === 'COOKBOOK_NOT_FOUND') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}
