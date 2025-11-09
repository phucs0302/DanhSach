    import React, { useState, useEffect } from "react";

    function StudentForm({ onSave, editingStudent }) {
    const [student, setStudent] = useState({
        hoten: "",
        age: "",
        class: "",
    });

    useEffect(() => {
        if (editingStudent) setStudent(editingStudent);
    }, [editingStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!student.hoten || !student.age || !student.class) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
        }
        onSave(student);
        setStudent({ hoten: "", age: "", class: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="form">
        <input
            name="hoten"
            value={student.hoten}
            onChange={handleChange}
            placeholder="Họ tên"
        />
        <input
            name="age"
            type="number"
            value={student.age}
            onChange={handleChange}
            placeholder="Tuổi"
        />
        <input
            name="class"
            value={student.class}
            onChange={handleChange}
            placeholder="Lớp"
        />
        <button type="submit">
            {editingStudent ? "Cập nhật" : "Thêm mới"}
        </button>
        </form>
    );
    }

    export default StudentForm;
