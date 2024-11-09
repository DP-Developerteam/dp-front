//Import Axios
import axios from 'axios';



// Create an Axios instance with default settings
const api = axios.create({
    baseURL: 'http://localhost:4000',
    // baseURL: process.env.REACT_APP_API_BASE_URL || 'https://rest-menu-backend.vercel.app/',
    timeout: 10000,
});

// Function to set the Authorization header with the token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Optional: Add response interceptors if needed
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default api;
