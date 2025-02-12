import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for all requests
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
    withCredentials: true, // Allows sending cookies or credentials if required
});

export default apiClient;