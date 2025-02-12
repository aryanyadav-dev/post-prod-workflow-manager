import React, { useState } from 'react';
import { Search, Plus, Folder, Trash2, Edit3, Check, PenTool } from 'lucide-react';
import { Button, Input, ScrollArea, Card } from '@/components/ui';

interface Note {
  id: string; title: string; content: string; lastEdited: Date; folder?: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<Note | null>(null);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [folders] = useState(['All Notes']);

  const createNote = () => {
    const newNote: Note = { id: `note-${Date.now()}`, title: 'Untitled', content: '', lastEdited: new Date(), folder: 'All Notes' };
    setNotes([newNote, ...notes]);
    setSelected(newNote);
    setIsEditing(true);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    setSelected(null);
  };

  const updateNote = (note: Note) => {
    setNotes(notes.map(n => n.id === note.id ? { ...note, lastEdited: new Date() } : n));
    setSelected(note);
  };

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Notes</h2>
        <button className="bg-transparent hover:bg-gray-800 rounded-full p-2" onClick={createNote}>
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-gray-800 border-r p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full px-10 py-2 rounded bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={search} 
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="h-[calc(100vh-200px)] overflow-y-auto">
            {filteredNotes.map(note => (
              <div 
                key={note.id}
                className={`p-3 mb-2 rounded cursor-pointer ${selected?.id === note.id ? 'bg-blue-800 border border-blue-600' : 'hover:bg-gray-700'}`}
                onClick={() => { setSelected(note); setIsEditing(false); }}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold truncate">{note.title}</h3>
                  <span className="text-xs text-gray-400">{note.lastEdited.toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {selected && (
            <div>
              <div className="flex justify-between items-center mb-4">
                {isEditing ? (
                  <input 
                    type="text"
                    value={selected.title}
                    onChange={e => updateNote({ ...selected, title: e.target.value })}
                    className="text-2xl font-bold bg-transparent border-none focus:outline-none text-white"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{selected.title}</h1>
                )}
                <div className="flex space-x-2">
                  {isEditing ? (
                    <button className="bg-transparent hover:bg-gray-800 rounded-full p-2" onClick={() => setIsEditing(false)}>
                      <Check className="h-5 w-5" />
                    </button>
                  ) : (
                    <button className="bg-transparent hover:bg-gray-800 rounded-full p-2" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-5 w-5" />
                    </button>
                  )}
                  <button className="bg-transparent hover:bg-gray-800 rounded-full p-2 text-red-500" onClick={() => deleteNote(selected.id)}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {isEditing ? (
                <textarea 
                  value={selected.content}
                  onChange={e => updateNote({ ...selected, content: e.target.value })}
                  className="w-full h-[calc(100vh-200px)] p-4 bg-gray-800 border-none rounded resize-none focus:outline-none text-white"
                />
              ) : (
                <div className="p-4 bg-gray-800 rounded">
                  {selected.content || 'No content'}
                </div>
              )}
            </div>
          ) || (
            <div className="flex items-center justify-center h-full text-gray-400">
              <PenTool className="mr-2 h-10 w-10" />
              <p>Select a note or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;