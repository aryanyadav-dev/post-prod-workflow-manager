import React, { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';
import { useNavigate } from 'react-router-dom';

interface TeamMember {
    name: string;
    count: number;
}

interface Project {
    id: string;
    name: string;
    description: string;
    projectType: string;
    teamMembers: TeamMember[];
}

const ProjectDashboard: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getUserProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to load projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (projectId: string) => {
        navigate(`/project/${projectId}`);
    };

    if (loading) return <p>Loading projects...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
            {projects.length === 0 ? (
                <p>No projects found. Create a new one!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="border p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{project.name}</h2>
                            <p className="text-gray-600">{project.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Type: {project.projectType}
                            </p>
                            <p className="text-sm text-gray-500">
                                Team Members: {project.teamMembers.length}
                            </p>
                            <button
                                onClick={() => handleProjectClick(project.id)}
                                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Go to Project
                            </button>

                            // Inside the return statement
                            <button
                                onClick={() => navigate('/create-project')}
                                className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                + Create New Project
                            </button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectDashboard;
