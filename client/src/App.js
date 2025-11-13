import React, { useState, useEffect, useCallback } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./api/studentApi";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // ✅ Lấy danh sách sinh viên
  const fetchStudents = useCallback(async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách sinh viên:", err);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ✅ Thêm hoặc cập nhật sinh viên
  const handleSave = async (student) => {
    try {
      if (editingStudent) {
        // Cập nhật sinh viên
        await updateStudent(editingStudent.id, student);
        setEditingStudent(null);
      } else {
        // Thêm sinh viên mới
        await addStudent(student);
      }
      fetchStudents();
    } catch (err) {
      console.error("❌ Lỗi khi lưu sinh viên:", err);
    }
  };  
  // ✅ Xóa sinh viên
const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      await deleteStudent(id);
      fetchStudents();
    }
  };
  
  return (
    <div className="container">
      <h1>Quản lý sinh viên</h1>
      <StudentForm
        onSave={editingStudent ? updateStudent : addStudent}
        editingStudent={editingStudent}
      />
      <StudentList
        students={students}
        onEdit={setEditingStudent}
        onDelete={deleteStudent}
      />
    </div>
  );
}

export default App;
