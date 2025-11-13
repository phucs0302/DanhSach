    import React, { useState, useEffect, useCallback} from "react";

    function StudentForm({ onSave, editingStudent }) {
    const [student, setStudent] = useState({
        hoten: "",
        age: "",
        class: "",
    });
// khi có sv chỉnh sửa, tự động fill form
    useEffect(() => {
        if (editingStudent) setStudent(editingStudent);
    }, [editingStudent]);

    //  Xử lý thay đổi input
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
}, []);

// Xử lý submit form
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!student.hoten || !student.age || !student.class) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
        }
        onSave(student);
        setStudent({ hoten: "", age: "", class: "" });
    },
    [student, onSave]
);  

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
