import React, { useState, useEffect } from 'react';
import { Project, TeamMember } from './types';
import { projectService } from './services/projectService';

const ProjectManagement: React.FC = () => {
    // State for project list
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for new project form
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState<Project>({
        name: '',
        description: '',
        projectType: 'FULL_LENGTH_VIDEO',
        teamMembers: [{ name: '', count: 1 }]
    });

    // Fetch existing projects
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await projectService.getProjects();
            setProjects(data);
            setError(null);
        } catch (err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        });
    };

    // Handle team member changes
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

    // Add team member field
    const addTeamMember = () => {
        setNewProject({
            ...newProject,
            teamMembers: [...newProject.teamMembers, { name: '', count: 1 }]
        });
    };

    // Handle project creation
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
            fetchProjects(); // Refresh project list
        } catch (err) {
            setError('Failed to create project');
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Project Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {showForm ? 'Cancel' : 'Create New Project'}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Project Name
                            <input
                                type="text"
                                name="name"
                                value={newProject.name}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                            <textarea
                                name="description"
                                value={newProject.description}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Project Type
                            <select
                                name="projectType"
                                value={newProject.projectType}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="FULL_LENGTH_VIDEO">Full-Length Video</option>
                                <option value="SHORT_FORM_CONTENT">Short-Form Content</option>
                            </select>
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Team Members</label>
                        {newProject.teamMembers.map((member, index) => (
                            <div key={index} className="flex gap-4 mb-2">
                                <input
                                    type="text"
                                    placeholder="Role"
                                    value={member.name}
                                    onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                    className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <input
                                    type="number"
                                    placeholder="Count"
                                    value={member.count}
                                    onChange={(e) => handleTeamMemberChange(index, 'name', parseInt(e.target.value))}
                                    className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    min="1"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTeamMember}
                            className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Add Team Member
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create Project
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                        <p className="text-gray-700 mb-2">{project.description}</p>
                        <p className="text-gray-600 mb-2">Type: {project.projectType}</p>
                        <div className="mt-4">
                            <h3 className="font-bold mb-2">Team Members:</h3>
                            {project.teamMembers.map((member, index) => (
                                <div key={index} className="text-gray-600">
                                    {member.name}: {member.count}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManagement;