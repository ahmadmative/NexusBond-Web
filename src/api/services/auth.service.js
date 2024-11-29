import { axiosAuthInstance } from '../config/axios.config';

export const authService = {
    login: async (email, password) => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axiosAuthInstance.post('/api/login', formData);
            
            if (response.data.token) {
                window.localStorage.setItem('AUTH_TOKEN_BACKEND', response.data.token);
                window.localStorage.setItem('USER', JSON.stringify(response.data.user));
                window.dispatchEvent(new Event('authStateChanged'));
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (email, password, fullName) => {
        try {
            const formData = new FormData();
            formData.append('name', fullName);
            formData.append('email', email);
            formData.append('password', password);

            const response = await axiosAuthInstance.post('/api/register', formData);
            if (response.data.token) {
                console.log(response.data.token);
                console.log(response.data.user);
                window.localStorage.setItem('AUTH_TOKEN_BACKEND', response.data.token);
                window.localStorage.setItem('USER', JSON.stringify(response.data.user));
            }
            
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    isAuthenticated: () => {
        return !!window.localStorage.getItem('AUTH_TOKEN_BACKEND');
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('AUTH_TOKEN_BACKEND');
            window.localStorage.removeItem('USER');
            window.dispatchEvent(new Event('authStateChanged'));
        }
    },

    getCurrentUser: () => {
        const userStr = window.localStorage.getItem('USER');
        return userStr ? JSON.parse(userStr) : null;
    },

    getAccessToken: () => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('AUTH_TOKEN_BACKEND');
        }
        return 'window is undefined';
    },

    setCurrentUser: (user) => {
        window.localStorage.setItem('USER', JSON.stringify(user));
    }
}; 
