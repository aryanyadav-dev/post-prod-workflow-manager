import React, { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Plus, Users, Calendar, ArrowRight } from 'lucide-react';

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
                const data = await projectService.getProjects();
                // Filter out projects without IDs
                const validProjects = data.filter((p): p is Project => !!p.id);
                setProjects(validProjects);
            } catch (error) {
                console.error("Failed to load projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (projectId: string) => {
        navigate(`/dashboard`, { state: { projectId } });
    };

    const handleCreateProject = () => {
        navigate('/projman');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading projects...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Header */}
            <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FolderOpen className="w-5 h-5 text-blue-400" />
                        <h1 className="text-lg font-semibold">Post-Production Manager</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Your Projects</h2>
                        <p className="text-gray-400">Manage and track your post-production workflows</p>
                    </div>
                    <button
                        onClick={handleCreateProject}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create New Project</span>
                    </button>
                </div>

                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FolderOpen className="w-24 h-24 text-gray-600 mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">No projects yet</h3>
                        <p className="text-gray-400 mb-6">Create your first project to get started</p>
                        <button
                            onClick={handleCreateProject}
                            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Project</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer group"
                                onClick={() => handleProjectClick(project.id)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <FolderOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                                                {project.name}
                                            </h3>
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">
                                                {project.projectType.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                </div>

                                <p className="text-gray-300 mb-4 line-clamp-2 min-h-[3rem]">
                                    {project.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <Users className="w-4 h-4" />
                                        <span className="text-sm">
                                            {project.teamMembers.reduce((sum, member) => sum + member.count, 0)} members
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">Active</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProjectDashboard;
