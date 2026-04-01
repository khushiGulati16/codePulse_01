const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all resources (optionally filter by category)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = 'SELECT * FROM resources';
        let params = [];

        if (category) {
            query += ' WHERE category = ?';
            params.push(category);
        }

        query += ' ORDER BY created_at DESC';
        const [resources] = await db.query(query, params);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get resource by ID
router.get('/:id', async (req, res) => {
    try {
        const [resources] = await db.query('SELECT * FROM resources WHERE id = ?', [req.params.id]);
        if (resources.length === 0) return res.status(404).json({ message: "Resource not found" });
        res.json(resources[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
