const express = require('express');
const router = express.Router();
const { User, Problem, Submission, sequelize } = require('../models');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get Dashboard Data
router.get('/stats', authenticateToken, isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalProblems = await Problem.count();
        const totalSubmissions = await Submission.count();
        
        // Submissions by status
        const stats = await Submission.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('status')), 'count']
            ],
            group: ['status']
        });

        // Recent Submissions
        const recentSubmissions = await Submission.findAll({
            limit: 5,
            order: [['created_at', 'DESC']],
            include: [
                { model: User, attributes: ['name'] },
                { model: Problem, as: 'problem', attributes: ['title'] }
            ]
        });

        res.json({
            users: totalUsers,
            problems: totalProblems,
            submissions: totalSubmissions,
            statusStats: stats,
            recent: recentSubmissions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin problem creation
router.post('/problems', authenticateToken, isAdmin, async (req, res) => {
    try {
        const problem = await Problem.create(req.body);
        res.status(201).json(problem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete problem
router.delete('/problems/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        await Problem.destroy({ where: { id: req.params.id } });
        res.json({ message: "Problem deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update problem
router.put('/problems/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Problem.update(req.body, { where: { id } });
        res.status(200).json({ message: "Problem updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
