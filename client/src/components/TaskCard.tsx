import React from 'react';
import { Clock, Flag, User } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      
      {task.fileMetadata && (
        <div className="bg-gray-50 p-2 rounded-md mb-3 text-xs">
          <p className="text-gray-600">File: {task.fileMetadata.filename}</p>
          <p className="text-gray-500">Size: {task.fileMetadata.size}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>{task.assignee || 'Unassigned'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}