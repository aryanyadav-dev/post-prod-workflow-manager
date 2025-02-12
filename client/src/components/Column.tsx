import React from 'react';
import { TaskCard } from './TaskCard';
import { Column as ColumnType } from '../types';

interface ColumnProps {
  column: ColumnType;
}

export function Column({ column }: ColumnProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg min-w-[300px]">
      <h2 className="font-semibold text-gray-700 mb-4">{column.title}</h2>
      <div className="flex flex-col gap-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}