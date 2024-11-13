import axios from 'axios';

// Create instance for backend API (login/auth)
const axiosAuthInstance = axios.create({
    baseURL: 'https://nexusbond.webjerky.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/json'
    }
});

// Add request interceptor for auth instance
axiosAuthInstance.interceptors.request.use(
    (config) => {
        const backendToken = window.localStorage.getItem('AUTH_TOKEN_BACKEND');
        if (backendToken) {
            config.headers.Authorization = `Bearer ${backendToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add request interceptor for main instance

export {axiosAuthInstance};

