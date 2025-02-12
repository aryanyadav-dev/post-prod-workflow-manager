import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Storyboard Sketches', description: 'Create initial sketches for the storyboard.' },
      { id: '2', title: 'Voiceover Recording', description: 'Record narration for the animation.' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Background Art', description: 'Design backgrounds for the main scenes.' },
    ],
  },
  {
    id: 'completed',
    title: 'Completed',
    tasks: [
      { id: '4', title: 'Character Design', description: 'Finalize character designs for the animation.' },
    ],
  },
];

export const Team: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleDragStart = (event: React.DragEvent, taskId: string, sourceColumnId: string) => {
    event.dataTransfer.setData('taskId', taskId);
    event.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  const handleDrop = (event: React.DragEvent, targetColumnId: string) => {
    const taskId = event.dataTransfer.getData('taskId');
    const sourceColumnId = event.dataTransfer.getData('sourceColumnId');

    if (sourceColumnId === targetColumnId) return;

    const sourceColumn = columns.find((column) => column.id === sourceColumnId)!;
    const targetColumn = columns.find((column) => column.id === targetColumnId)!;

    const task = sourceColumn.tasks.find((task) => task.id === taskId)!;

    sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== taskId);
    targetColumn.tasks.push(task);

    setColumns([...columns]);
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex h-full p-4 gap-4 bg-gray-900 text-white">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex flex-col w-80 bg-gray-800 p-4 rounded-md shadow-md overflow-y-auto"
          onDragOver={allowDrop}
          onDrop={(event) => handleDrop(event, column.id)}
        >
          <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
          <div className="space-y-4">
            {column.tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-gray-700 rounded-md shadow cursor-pointer w-full"
                draggable
                onDragStart={(event) => handleDragStart(event, task.id, column.id)}
              >
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-400">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

