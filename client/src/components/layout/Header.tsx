import React from 'react';
import { ArrowLeft, PlayCircle, Share2, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-full px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section: Title and Back Button */}
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-white text-lg font-medium">Post-Production Workflow Hub</h1>
                <p className="text-gray-400 text-sm">Project: Interstellar</p>
              </div>
            </div>

            {/* Right Section: Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                <PlayCircle size={16} />
                Preview
              </button>
              <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                <Share2 size={16} />
                Share
              </button>
              <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
  );
}
