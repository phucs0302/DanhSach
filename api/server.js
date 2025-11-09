    const express = require('express');
    const cors = require('cors');
    const db = require('./db');

    const app = express();
    app.use(cors());
    app.use(express.json());

    // ✅ Lấy danh sách sinh viên
    app.get('/api/sinhvien', (req, res) => {
         db.query("SELECT * FROM sinhvien", (err, results) => {
    if (err) {
        console.error("Lỗi truy vấn:", err);
        return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    }
    res.json(results); // <-- trả về MẢNG
});
        const   page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        //đếm tổng số svien
        db.query('SELECT COUNT(*) AS count FROM sinhvien', (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const totalItems = countResult[0].count;
        const totalPages = Math.ceil(totalItems / limit);

        //lấy dữ liệu svien
        const sql = 'SELECT * FROM sinhvien LIMIT ? OFFSET ?';
        db.query(sql, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
            data: results,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems
            }
            });
        });
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
