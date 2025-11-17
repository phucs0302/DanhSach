    const express = require('express');
    const db = require('../db');
    const { authMiddleware, requireRole } = require('../middleware/auth');
    const router = express.Router();

    // GET danh sách sinh viên — KHÔNG yêu cầu token
    router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 10, 1000);
        const offset = (page - 1) * limit;

        const [countRes] = await db.query("SELECT COUNT(*) AS total FROM sinhvien");
        const total = countRes[0].total;
        const totalPages = Math.ceil(total / limit);

        const [rows] = await db.query("SELECT * FROM sinhvien LIMIT ? OFFSET ?", [
        limit,
        offset,
        ]);

        res.json({
        data: rows,
        pagination: {
            page,
            total,
            totalPages,
        },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB error" });
    }
    });

    // GET chi tiết — không cần token
    router.get('/:id', async (req, res) => {
    const [rows] = await db.query("SELECT * FROM sinhvien WHERE id=?", [
        req.params.id,
    ]);
    res.json(rows[0]);
    });

    // ADD — yêu cầu admin
    router.post('/', authMiddleware, requireRole("admin"), async (req, res) => {
    const { hoten, age, class: cls } = req.body;
    const [r] = await db.query(
        "INSERT INTO sinhvien (hoten, age, class) VALUES (?,?,?)",
        [hoten, age, cls]
    );
    res.json({ id: r.insertId });
    });

    // UPDATE — yêu cầu admin
    router.put('/:id', authMiddleware, requireRole("admin"), async (req, res) => {
    const { hoten, age, class: cls } = req.body;
    await db.query("UPDATE sinhvien SET hoten=?, age=?, class=? WHERE id=?", [
        hoten,
        age,
        cls,
        req.params.id,
    ]);
    res.json({ ok: true });
    });

    // DELETE — yêu cầu admin
    router.delete('/:id', authMiddleware, requireRole("admin"), async (req, res) => {
    await db.query("DELETE FROM sinhvien WHERE id=?", [req.params.id]);
    res.json({ ok: true });
    });

    module.exports = router;
