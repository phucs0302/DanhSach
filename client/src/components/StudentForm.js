    import React, { useState, useEffect } from "react";

    const StudentForm = ({ onSave, editingStudent }) => {
    const [hoten, setHoten] = useState("");
    const [age, setAge] = useState("");
    const [lop, setLop] = useState("");

    useEffect(() => {
        if (editingStudent) {
        setHoten(editingStudent.hoten);
        setAge(editingStudent.age);
        setLop(editingStudent.class);
        } else {
        setHoten("");
        setAge("");
        setLop("");
        }
    }, [editingStudent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ hoten, age, class: lop });
    };

    return (
        <form onSubmit={handleSubmit} className="student-form">
        <input
            type="text"
            placeholder="Họ tên"
            value={hoten}
            onChange={(e) => setHoten(e.target.value)}
        />
        <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={(e) => setAge(e.target.value)}
        />
        <input
            type="text"
            placeholder="Lớp"
            value={lop}
            onChange={(e) => setLop(e.target.value)}
        />
        <button type="submit">{editingStudent ? "Cập nhật" : "Thêm mới"}</button>
        </form>
    );
    };

    export default StudentForm;
