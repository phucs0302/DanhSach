import api from './axiosConfig';
export const fetchStudents = (page=1,limit=10,q='',cls='') => api.get(`/sinhvien?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}&class=${encodeURIComponent(cls)}`);
export const getStudent = (id) => api.get(`/sinhvien/${id}`);
export const createStudent = (s) => api.post('/sinhvien', s);
export const updateStudent = (id,s) => api.put(`/sinhvien/${id}`, s);
export const removeStudent = (id) => api.delete(`/sinhvien/${id}`);
