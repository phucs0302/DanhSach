    // src/api/axiosConfig.js
    import axios from "axios";

    const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api", // đổi URL theo backend của bạn
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    });

    // ✅ Thêm interceptor để log hoặc xử lý token
   axiosInstance.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});


    axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("❌ Lỗi API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
    );

    export default axiosInstance;
