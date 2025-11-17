    import React from "react";

    function StudentList({ students, onEdit, onDelete }) {
    return (
        <table>
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
            {students.map((s) => (
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
            ))}
        </tbody>
        </table>
    );
    }

    export default StudentList;
