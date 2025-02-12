import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/sidebar/Sidebar';
import { WorkflowEditor } from '../components/workflow/WorkflowEditor';
import { Dashboard } from '../components/dashboard/Dashboard';
import { Team } from '../components/team/team';
import { Workspace } from '../components/workspace/Workspace';
import { Login } from '../components/auth_pages/Login';
import { Register } from '../components/auth_pages/Register';
import Schedule from '../components/schedule/schedule';
import { PreviewPage } from '../components/preview/PreviewPage';
import Dropbox from '../components/dropbox/Dropbox';
import Storyboarder from '../components/storyboarder/Storyboarder';
import Screenwriting from '../components/screenwriting/screenwriting';
import { useState } from 'react';
import { Stage } from '../types';
import  Notes  from '../components/notes/notes';
import ProjectChatroom from "./projectchatroom/projectchatroom.tsx";
import ProjectDashboard from "./ProjectDashboard.tsx";
import CreateProject from "./CreateProject.tsx";
import ProjectManagement from "../ProjectManagement.tsx";

type Page = 'dashboard' | 'workflow' | 'team' | 'workspace' | 'schedule' | 'dropbox' | 'storyboarder' | 'screenwriting' | 'notes';

const ProtectedLayout = () => {
    const { isAuthenticated } = useAuth();
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');

    const stages: Stage[] = [
        {
            id: '1',
            name: 'Footage Import',
            status: 'active',
            tasks: [
                {
                    id: '1',
                    title: 'Import Raw Footage',
                    status: 'in-progress',
                    priority: 'high',
                    description: 'Transfer 4K footage from RED camera cards',
                },
                {
                    id: '2',
                    title: 'Create Proxy Files',
                    status: 'todo',
                    priority: 'medium',
                    description: 'Generate 1080p proxy files for editing',
                },
            ],
        },
    ];

    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar onPageChange={handlePageChange} currentPage={currentPage} />
                <main className="flex-1 overflow-auto">
                    {currentPage === 'dashboard' && <Dashboard />}
                    {currentPage === 'workflow' && <WorkflowEditor stages={stages} />}
                    {currentPage === 'team' && <Team />}
                    {currentPage === 'workspace' && <Workspace />}
                    {currentPage === 'schedule' && <Schedule />}
                    {currentPage === 'dropbox' && <Dropbox />}
                    {currentPage === 'storyboarder' && <Storyboarder />}
                    {currentPage === 'screenwriting' && <Screenwriting />}
                    {currentPage === 'notes' && <Notes />}
                    {currentPage === ''}
                </main>
            </div>
        </div>
    );
};

export const Router = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {isAuthenticated ? (
                <>
                    <Route path="/dashboard" element={<ProtectedLayout />} />
                    <Route path="/workflow" element={<ProtectedLayout />} />
                    <Route path="/team" element={<ProtectedLayout />} />
                    <Route path="/workspace" element={<ProtectedLayout />} />
                    <Route path="/schedule" element={<ProtectedLayout />} />
                    <Route path="/dropbox" element={<ProtectedLayout />} />
                    <Route path="/storyboarder" element={<ProtectedLayout />} />
                    <Route path="/screenwriting" element={<ProtectedLayout />} />
                    <Route path="/notes" element={<ProtectedLayout />} />
                    <Route path="/preview" element={<PreviewPage />} />
                    <Route path="/projectchatroom" element={<ProjectChatroom />} />
                    <Route path="/projectdashboard" element={<ProjectDashboard />} />
                    <Route path="/createproj" element={<CreateProject />} />
                    <Route path="/projman" element={<ProjectManagement />} />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}
        </Routes>
    );
};