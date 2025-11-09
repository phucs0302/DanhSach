import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // ✅ Lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/sinhvien");
      if (res.data && Array.isArray(res.data.data)) {
        setStudents(res.data.data);
      } else if (Array.isArray(res.data)) {
        setStudents(res.data);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách sinh viên:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Thêm sinh viên
  const addStudent = async (student) => {
    try {
      await axios.post("http://localhost:3000/api/sinhvien", student);
      fetchStudents();
    } catch (err) {
      alert("❌ Không thể thêm sinh viên: " + err.response?.data?.error);
    }
  };

  // ✅ Cập nhật sinh viên
  const updateStudent = async (student) => {
    try {
      await axios.put(
        `http://localhost:3000/api/sinhvien/${student.id}`,
        student
      );
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      alert("❌ Lỗi cập nhật: " + err.response?.data?.error);
    }
  };

  // ✅ Xóa sinh viên
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/sinhvien/${id}`);
      fetchStudents();
    } catch (err) {
      alert("❌ Lỗi xóa sinh viên: " + err.response?.data?.error);
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
