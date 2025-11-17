    // api/routes/auth.js
    const express = require('express');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const db = require('../db');
    require('dotenv').config();

    const router = express.Router();

    // register (admin can create users via admin panel; for dev we allow register)
    router.post('/register', async (req, res) => {
    const { username, password, fullname, role, student_id } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing' });
    const hash = await bcrypt.hash(password, 10);
    try {
        const [r] = await db.query('INSERT INTO users (username,password,fullname,role,student_id) VALUES (?,?,?,?,?)', [username, hash, fullname, role || 'student', student_id || null]);
        res.json({ id: r.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB error' });
    }
    });

    router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role, student_id: user.student_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.id, username: user.username, fullname: user.fullname, role: user.role, student_id: user.student_id } });
    });

    module.exports = router;
