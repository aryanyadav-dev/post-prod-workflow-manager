import axios from 'axios';
import { Project } from './../types/index';

const API_URL = 'http://localhost:8080/api';

export const projectService = {
    getProjects: async (): Promise<Project[]> => {
        try {
            const response = await axios.get(`${API_URL}/projects/my-projects`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },

    createProject: async (projectData: Project): Promise<Project> => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await axios.post(
                `${API_URL}/projects`,
                projectData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }
};