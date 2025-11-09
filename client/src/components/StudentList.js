    import React from "react";

    function StudentList({ students, onEdit, onDelete }) {
    if (!Array.isArray(students)) {
        return <p>Dữ liệu không hợp lệ hoặc chưa tải được.</p>;
    }

    return (
        <table className="student-table">
        <thead>
            <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            {students.length > 0 ? (
            students.map((s) => (
                <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.hoten}</td>
                <td>{s.age}</td>
                <td>{s.class}</td>
                <td>
                    <button onClick={() => onEdit(s)}>Sửa</button>
                    <button onClick={() => onDelete(s.id)}>Xóa</button>
                </td>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                Chưa có dữ liệu sinh viên
                </td>
            </tr>
            )}
        </tbody>
        </table>
    );
    }

    export default StudentList;
