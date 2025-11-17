    import React, { useState, useEffect } from "react";

    function StudentForm({ onSave, editingStudent }) {
    const [form, setForm] = useState({
        hoten: "",
        age: "",
        class: "",
    });

    useEffect(() => {
        if (editingStudent) setForm(editingStudent);
    }, [editingStudent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        setForm({ hoten: "", age: "", class: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            placeholder="Họ tên"
            value={form.hoten}
            onChange={(e) => setForm({ ...form, hoten: e.target.value })}
        />
        <input
            placeholder="Tuổi"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
            placeholder="Lớp"
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
        />
        <button type="submit">Lưu</button>
        </form>
    );
    }

    export default StudentForm;
