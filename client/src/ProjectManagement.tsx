import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, TeamMember } from './types';
import { projectService } from './services/projectService';
import { FolderOpen, Plus, X, Users, ArrowLeft } from 'lucide-react';

const ProjectManagement: React.FC = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState<Project>({
        name: '',
        description: '',
        projectType: 'FULL_LENGTH_VIDEO',
        teamMembers: [{ name: '', count: 1 }]
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(false);
            const data = await projectService.getProjects();
            setProjects(data);
            setError(null);
        } catch (err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        });
    };

    const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string | number) => {
        const updatedMembers = [...newProject.teamMembers];
        updatedMembers[index] = {
            ...updatedMembers[index],
            [field]: value
        };
        setNewProject({
            ...newProject,
            teamMembers: updatedMembers
        });
    };

    const addTeamMember = () => {
        setNewProject({
            ...newProject,
            teamMembers: [...newProject.teamMembers, { name: '', count: 1 }]
        });
    };

    const removeTeamMember = (index: number) => {
        if (newProject.teamMembers.length > 1) {
            const updatedMembers = newProject.teamMembers.filter((_, i) => i !== index);
            setNewProject({
                ...newProject,
                teamMembers: updatedMembers
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await projectService.createProject(newProject);
            setShowForm(false);
            setNewProject({
                name: '',
                description: '',
                projectType: 'FULL_LENGTH_VIDEO',
                teamMembers: [{ name: '', count: 1 }]
            });
            fetchProjects();
            navigate('/projectdashboard');
        } catch (err) {
            setError('Failed to create project');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
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
                        <h1 className="text-lg font-semibold">Project Management</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/projectdashboard')}
                            className="flex items-center space-x-1.5 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>View All Projects</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Create New Project</h2>
                        <p className="text-gray-400">Set up your post-production workflow</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Project Form */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={newProject.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                placeholder="Enter project name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={newProject.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
                                placeholder="Describe your project"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">
                                Project Type *
                            </label>
                            <select
                                name="projectType"
                                value={newProject.projectType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            >
                                <option value="FULL_LENGTH_VIDEO">Full-Length Video</option>
                                <option value="SHORT_FORM_CONTENT">Short-Form Content</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-300">
                                Team Members
                            </label>
                            <div className="space-y-3">
                                {newProject.teamMembers.map((member, index) => (
                                    <div key={index} className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Role (e.g., Editor, Colorist)"
                                            value={member.name}
                                            onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Count"
                                            value={member.count}
                                            onChange={(e) => handleTeamMemberChange(index, 'count', parseInt(e.target.value) || 1)}
                                            className="w-24 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                            min="1"
                                        />
                                        {newProject.teamMembers.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTeamMember(index)}
                                                className="px-3 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addTeamMember}
                                className="mt-3 flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Team Member</span>
                            </button>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                            >
                                Create Project
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/projectdashboard')}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ProjectManagement;