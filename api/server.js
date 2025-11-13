    const express = require('express');
    const cors = require('cors');
    const db = require('./db');

    const app = express();
    app.use(cors());
    app.use(express.json());

    // ✅ Lấy danh sách sinh viên
    app.get('/api/sinhvien', (req, res) => {

        const   page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const countQuery = 'SELECT COUNT(*) AS count FROM sinhvien';
        const dataQuery = 'SELECT * FROM sinhvien LIMIT ? OFFSET ?';

        db.query(countQuery, (err, countResults) => {
            if (err) 
                return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });

            const totalItems = countResults[0].count;
            const totalPages = Math.ceil(totalItems / limit);

        db.query(dataQuery, [limit, offset], (err, results) => {
        if (err) 
            return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });

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
app.post("/api/sinhvien", (req, res) => {
    const { hoten, age, class: lop } = req.body;

    if (!hoten || !age || !lop) {
        return res.status(400).json({ error: "Thiếu dữ liệu!" });
    }

    const sql = "INSERT INTO sinhvien (hoten, age, `class`) VALUES (?, ?, ?)";
    db.query(sql, [hoten, age, lop], (err, result) => {
        if (err) {
        console.error("❌ Lỗi khi thêm sinh viên:", err);
        return res.status(500).json({ error: "Lỗi khi thêm sinh viên!" });
        }
        res.status(201).json({ message: "✅ Thêm sinh viên thành công!" });
    });
    });

    // ✅ Sửa thông tin sinh viên
    app.put('/api/sinhvien/:id', (req, res) => {
    const { id } = req.params;
    const { hoten, age, class: lop } = req.body;
    if (!id || !hoten || !age || !lop)
        return res.status(400).json({ error: "Thiếu dữ liệu" });

        const sql = "UPDATE sinhvien SET hoten = ?, age = ?, `class` = ? WHERE id = ?";
    db.query(sql, [hoten, age, lop, id], (err, result) => {
        if (err) {
        console.error("❌ Lỗi khi cập nhật sinh viên:", err);
        return res.status(500).json({ error: "Lỗi khi cập nhật sinh viên!" });
        }
        res.json({ message: "✅ Cập nhật thành công!" });
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

    app.listen(3001, () => {
    console.log('Server đang chạy trên http://localhost:3001');
    });
