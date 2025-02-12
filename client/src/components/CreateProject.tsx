import React, { useState } from 'react';
import { projectService } from '../services/projectService';
import { useNavigate } from 'react-router-dom';

const CreateProject: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectType, setProjectType] = useState('FULL_LENGTH_VIDEO');
    const [teamMembers, setTeamMembers] = useState([{ name: '', count: 0 }]);
    const navigate = useNavigate();

    const handleMemberChange = (index: number, field: string, value: any) => {
        const newMembers = [...teamMembers];
        newMembers[index] = { ...newMembers[index], [field]: value };
        setTeamMembers(newMembers);
    };

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, { name: '', count: 0 }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newProject = {
                name,
                description,
                projectType,
                teamMembers: teamMembers.filter(member => member.name.trim() !== '' && member.count > 0)
            };
            const createdProject = await projectService.createProject(newProject);
            navigate(`/project/${createdProject.id}`);
        } catch (error) {
            console.error('Project creation failed', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                />
                <textarea
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                />
                <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="border p-2 w-full rounded"
                >
                    <option value="FULL_LENGTH_VIDEO">Full-Length Video</option>
                    <option value="SHORT_FORM_CONTENT">Short-Form Content</option>
                </select>

                <div>
                    <h2 className="font-semibold">Team Members</h2>
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                            <input
                                type="text"
                                placeholder="Role (e.g., Editor)"
                                value={member.name}
                                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                className="border p-2 rounded w-1/2"
                            />
                            <input
                                type="number"
                                placeholder="Count"
                                value={member.count}
                                onChange={(e) => handleMemberChange(index, 'count', Number(e.target.value))}
                                className="border p-2 rounded w-1/4"
                                min="1"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTeamMember}
                        className="mt-2 bg-gray-300 px-4 py-2 rounded"
                    >
                        + Add Member
                    </button>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create Project
                </button>
            </form>
        </div>
    );
};

export default CreateProject;
