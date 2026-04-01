const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || 'user';

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
