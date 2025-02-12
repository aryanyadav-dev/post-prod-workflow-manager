import React, { useState } from 'react';
import { FiTool, FiFileText, FiLink } from 'react-icons/fi';

interface CanvasItem {
  id: string;
  type: 'note' | 'shape';
  content: string;
  x: number;
  y: number;
}

interface Connector {
  id: string;
  from: string;
  to: string;
}

export const Workspace: React.FC = () => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const addItem = (type: 'note' | 'shape') => {
    const newItem: CanvasItem = {
      id: `${Date.now()}`,
      type,
      content: type === 'note' ? 'New Note' : '',
      x: 200,
      y: 100,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setConnectors((prev) => prev.filter((connector) => connector.from !== id && connector.to !== id));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setDraggingItem(id);
      setOffset({ x: e.clientX - item.x, y: e.clientY - item.y });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingItem) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;

      setItems((prev) =>
        prev.map((item) =>
          item.id === draggingItem ? { ...item, x, y } : item
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingItem(null);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingItem, offset]);

  const handleContentChange = (id: string, content: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, content } : item
      )
    );
  };

  const handleConnect = (id: string) => {
    if (!selectedItem) {
      setSelectedItem(id);
    } else {
      if (selectedItem !== id) {
        const newConnector: Connector = {
          id: `${Date.now()}`,
          from: selectedItem,
          to: id,
        };
        setConnectors((prev) => [...prev, newConnector]);
        setSelectedItem(null);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-60 bg-gray-800 p-4 flex flex-col gap-4">
        <h1 className="text-lg font-bold text-center flex items-center gap-2">
          <FiTool /> Tools
        </h1>
        <button
          onClick={() => addItem('note')}
          className="w-full px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FiFileText />
          Add Note
        </button>
        <button
          onClick={() => addItem('shape')}
          className="w-full px-4 py-2 flex items-center gap-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FiLink />
          Add Shape
        </button>
        <button
          onClick={() => setSelectedItem(null)}
          className="w-full px-4 py-2 flex items-center gap-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          <FiLink />
          Connector
        </button>
      </div>
      <div
        className="flex-1 relative bg-gray-900"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        {connectors.map((connector) => {
          const fromItem = items.find((item) => item.id === connector.from);
          const toItem = items.find((item) => item.id === connector.to);

          if (fromItem && toItem) {
            const fromCenterX = fromItem.x + 125;
            const fromCenterY = fromItem.y + 75;
            const toCenterX = toItem.x + 125;
            const toCenterY = toItem.y + 75;

            return (
              <line
                key={connector.id}
                x1={fromCenterX}
                y1={fromCenterY}
                x2={toCenterX}
                y2={toCenterY}
                stroke="white"
                strokeWidth="2"
              />
            );
          }
          return null;
        })}

        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute p-4 rounded shadow-lg ${
              item.type === 'note' ? 'bg-gray-100' : 'bg-green-300'
            } cursor-move`}
            style={{
              top: item.y,
              left: item.x,
              zIndex: selectedItem === item.id ? 10 : 1,
              width: '250px',
              height: '150px',
            }}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
            onClick={() => handleConnect(item.id)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item.id);
              }}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              style={{ transform: 'translate(50%, -50%)' }}
            >
              X
            </button>

            {item.type === 'note' ? (
              <textarea
                className="w-full bg-transparent border-none resize-none focus:outline-none text-blue-600"
                value={item.content}
                onChange={(e) => handleContentChange(item.id, e.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '0',
                  overflow: 'hidden',
                }}
              />
            ) : (
              <div>{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workspace;
