import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext"; // Import context
import {
  fetchStudents,
  createStudent,
  updateStudent,
  removeStudent,
} from "./api/studentApi";

import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";


function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadData = async () => {
    try {
      const res = await fetchStudents();
      setStudents(res.data.data || res.data);
    } catch (error) {
      console.error("Error loading data:", error);
      // Optional: Show error message to user
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);



  const handleSave = async (student) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, student);
    } else {
      await createStudent(student);
    }
    setEditingStudent(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await removeStudent(id);
    loadData();
  };

  return (
    <div>
      <h2>Quản lý sinh viên</h2>
      <StudentForm onSave={handleSave} editingStudent={editingStudent} />
      <StudentList
        students={students}
        onEdit={setEditingStudent}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;