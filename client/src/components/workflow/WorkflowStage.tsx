import React from 'react';
import { Grip, MoreHorizontal } from 'lucide-react';
import { Stage } from '../../types';

interface WorkflowStageProps {
  stage: Stage;
}

export function WorkflowStage({ stage }: WorkflowStageProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Grip className="text-gray-500" size={16} />
          <span className={`w-2 h-2 rounded-full ${stage.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`} />
          <h3 className="text-white font-medium">{stage.name}</h3>
        </div>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        {stage.tasks.map((task) => (
          <div 
            key={task.id} 
            className="bg-gray-700 p-3 rounded border border-gray-600 hover:border-gray-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-200">{task.title}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'high' ? 'bg-red-900 text-red-200' :
                task.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                'bg-blue-900 text-blue-200'
              }`}>
                {task.priority}
              </span>
            </div>
            <div className="text-sm text-gray-400">{task.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}