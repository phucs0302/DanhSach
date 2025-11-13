    import axios from "axios";

    const API_URL = "http://localhost:3001/api/sinhvien"; 

    // 🟢 Lấy danh sách sinh viên
    export const getStudents = async () => {
    const res = await axios.get(API_URL);
    return res.data.data || res.data; // tùy cấu trúc JSON server trả về
    };

    // 🟢 Thêm sinh viên mới
    export const addStudent = async (student) => {
    const res = await axios.post(API_URL, student);
    return res.data;
    };

    // 🟢 Cập nhật sinh viên
    export const updateStudent = async (id, student) => {
    const res = await axios.put(`${API_URL}/${id}`, student);
    return res.data;
    };

    // 🟢 Xóa sinh viên
    export const deleteStudent = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
    };
