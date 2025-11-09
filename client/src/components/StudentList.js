    import React from "react";

    const StudentList = ({ students, onEdit, onDelete }) => {
    return (
        <table border="1" className="student-table">
        <thead>
            <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            {students.map((s, index) => (
            <tr key={s.id}>
                <td>{index + 1}</td>
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
    };

    export default StudentList;
