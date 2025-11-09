import React, { useEffect, useState } from "react";
import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./api";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadData = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
  fetch("http://localhost:3000/api/sinhvien")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.error("Dữ liệu không phải mảng:", data);
        setStudents([]);
      }
    })
    .catch(err => console.error("Lỗi API:", err));
}, []);


  const handleSave = async (student) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, student);
    } else {
      await addStudent(student);
    }
    setEditingStudent(null);
    loadData();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadData();
  };

  return (
    <div className="App">
      <h1>Quản lý sinh viên</h1>
      <StudentForm onSave={handleSave} editingStudent={editingStudent} />
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
