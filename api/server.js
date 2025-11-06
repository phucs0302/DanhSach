    const express = require('express');
    const cors = require('cors');
    const db = require('./db');

    const app = express();
    app.use(cors());
    app.use(express.json());

    // ✅ Lấy danh sách sinh viên
    app.get('/api/sinhvien', (req, res) => {
    db.query('SELECT * FROM sinhvien', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
    });

    // ✅ Thêm sinh viên mới
    app.post('/api/sinhvien', (req, res) => {
    const { hoten, age, class: lop } = req.body;
    if (!hoten || !age || !lop)
        return res.status(400).json({ error: 'Thiếu dữ liệu' });

    const sql = 'INSERT INTO sinhvien (hoten, age, class) VALUES (?, ?, ?)';
    db.query(sql, [hoten, age, lop], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Thêm thành công', id: result.insertId });
    });
    });

    // ✅ Sửa thông tin sinh viên
    app.put('/api/sinhvien/:id', (req, res) => {
    const { id } = req.params;
    const { hoten, age, class: lop } = req.body;
    if (!id || !hoten || !age || !lop)
        return res.status(400).json({ error: "Thiếu dữ liệu" });

    const sql = 'UPDATE sinhvien SET hoten = ?, age = ?, class = ? WHERE id = ?';
    db.query(sql, [hoten, age, lop, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cập nhật thành công' });
    });
    });

    // ✅ Xóa sinh viên
    app.delete('/api/sinhvien/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM sinhvien WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Xóa thành công' });
    });
    });

    app.listen(3000, () => {
    console.log('Server đang chạy trên http://localhost:3000');
    });
