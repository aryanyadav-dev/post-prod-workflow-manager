import React from 'react';
import { WorkflowStage } from './WorkflowStage';
import { Stage } from '../../types';

interface WorkflowEditorProps {
  stages: Stage[];
}

export function WorkflowEditor({ stages }: WorkflowEditorProps) {
  return (
    <div className="flex-1 overflow-auto p-6 bg-gray-900">
      <div 
        className="grid gap-6"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(64 64 64 / 0.2) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      >
        {stages.map((stage) => (
          <WorkflowStage key={stage.id} stage={stage} />
        ))}
      </div>
    </div>
  );
}