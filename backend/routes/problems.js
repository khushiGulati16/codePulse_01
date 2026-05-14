const express = require('express');
const router = express.Router();
const { Problem } = require('../models');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all problems
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.findAll({
            attributes: ['id', 'title', 'difficulty']
        });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem.findByPk(req.params.id);
        if (!problem) return res.status(404).json({ message: "Problem not found" });
        res.json(problem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create problem (Admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { title, description, input_format, output_format, sample_input, sample_output, difficulty } = req.body;
        const newProblem = await Problem.create({
            title, description, input_format, output_format, sample_input, sample_output, difficulty
        });
        res.status(201).json({ message: "Problem created successfully", id: newProblem.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
