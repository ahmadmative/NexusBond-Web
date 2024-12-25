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
                // Check subscription status
                const user = response.data.user;
                if (!user.subscribedTo || user.subscribedTo === "No subscription found" || !user.subscribedTo.id) {
                    window.location.href = '/subscriptionHome';
                } else {
                    window.location.href = '/home';
                }
            }
            return response.data;
        } catch (error) {

            throw error;
        }
    },

    register: async (userData) => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('email', userData.email);
            formData.append('password', userData.password);

            const response = await axiosAuthInstance.post('/api/register', formData);
            if (response.data.token) {
                window.localStorage.setItem('AUTH_TOKEN_BACKEND', response.data.token);
                window.localStorage.setItem('USER', JSON.stringify(response.data.user));
                window.dispatchEvent(new Event('authStateChanged'));
            }
            
            return response.data;
        } catch (error) {

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
    },

    sendOTP: async (email) => {
        try {
            const formData = new FormData();
            formData.append('email', email);

            const response = await axiosAuthInstance.post('/api/send-otp', formData);
            return response.data;
        } catch (error) {

            throw error;
        }
    },

    changePassword: async (email, password) => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axiosAuthInstance.post('/api/change-password', formData);
            return response.data;
        } catch (error) {

            throw error;
        }
    },

    makeRequest: async (method, endpoint, data = null) => {
        try {
            const response = await axiosAuthInstance({
                method,
                url: `/api${endpoint}`,
                data
            });
            return response;
        } catch (error) {

            throw error;
        }
    }
}; 
