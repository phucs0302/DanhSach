    const mysql = require('mysql2');

    const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // không có dấu cách!
    password: '12345',        // nếu có mật khẩu thì ghi vào đây
    database: 'qlsinhvien'
    });

    db.connect((err) => {
    if (err) {
        console.error('❌ Lỗi kết nối DB:', err);
    } else {
        console.log('✅ Kết nối DB thành công');
    }
    });

    module.exports = db;
