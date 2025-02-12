import axios from 'axios';
import { LoginRequest, AuthUser } from '../types';

const API_URL = 'http://localhost:8080';

let interceptorId: number | null = null;

export const authService = {
    login: async (loginRequest: LoginRequest) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, loginRequest);
            if (response.data) {
                localStorage.setItem('token', response.data);
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login failed', error.response?.data || error.message);
                throw error.response?.data || error;
            }
            console.error('Login failed', error);
            throw error;
        }
    },

    register: async (user: AuthUser) => {
        try {
            const fullUserData = {
                ...user,
                active: true  // Ensure active status is set
            };
            const response = await axios.post(`${API_URL}/register`, fullUserData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration failed', error.response?.data || error.message);
                throw error.response?.data || error;
            }
            console.error('Registration failed', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token; // Returns true if token exists
    },


    setupAxiosInterceptors: () => {
        // Remove existing interceptor if it exists
        if (interceptorId !== null) {
            axios.interceptors.request.eject(interceptorId);
        }


        interceptorId = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};