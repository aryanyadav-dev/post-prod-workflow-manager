import React, { useState, useRef, useEffect } from 'react';

    const Screenwriting: React.FC = () => {
      const [lines, setLines] = useState([{ type: 'action', text: '' }]);
      const [currentLineIndex, setCurrentLineIndex] = useState(0);
      const [showAutocomplete, setShowAutocomplete] = useState(false);
      const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
      const [isReadOnly, setIsReadOnly] = useState(false);
      const [comments, setComments] = useState<Record<number, string>>({});
      const textareaRefs = useRef<HTMLTextAreaElement[]>([]);
      const [currentLineComment, setCurrentLineComment] = useState('');
      const currentLineRef = useRef<HTMLDivElement>(null);

      const formats = ['action', 'character', 'dialogue', 'parenthetical', 'scene heading'];

      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const viewMode = urlParams.get('view');
        setIsReadOnly(viewMode === 'true');
      }, []);

      useEffect(() => {
        if (currentLineRef.current) {
          currentLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, [currentLineIndex]);

      const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (lines[index].text.trim() === '') {
            const newTypeIndex = (formats.indexOf(lines[index].type) + 1) % formats.length;
            const newType = formats[newTypeIndex];
            const newLines = [...lines];
            newLines[index] = { ...newLines[index], type: newType };
            setLines(newLines);
          } else {
            const newLines = [...lines];
            newLines.splice(index + 1, 0, { type: 'action', text: '' });
            setLines(newLines);
            setCurrentLineIndex(index + 1);
          }
        } else if (event.key === 'Tab') {
          event.preventDefault();
          const newTypeIndex = (formats.indexOf(lines[index].type) + (event.shiftKey ? -1 : 1) + formats.length) % formats.length;
          const newType = formats[newTypeIndex];
          const newLines = [...lines];
          newLines[index] = { ...newLines[index], type: newType };
          setLines(newLines);
        } else if ((event.ctrlKey || event.metaKey) && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
          event.preventDefault();
          const newIndex = event.key === 'ArrowUp' ? Math.max(0, index - 1) : Math.min(lines.length - 1, index + 1);
          if (newIndex !== index) {
            const newLines = [...lines];
            const temp = newLines[index];
            newLines[index] = newLines[newIndex];
            newLines[newIndex] = temp;
            setLines(newLines);
            setCurrentLineIndex(newIndex);
          }
        }
      };

      const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newText = event.target.value;
        const newLines = [...lines];
        newLines[index] = { ...newLines[index], text: newText };
        setLines(newLines);
        setCurrentLineIndex(index);

        if (newLines[index].type === 'character' || newLines[index].type === 'scene heading') {
          const options = ['INT. COFFEE SHOP - DAY', 'EXT. PARK - DAY', 'JOHN', 'MARY', 'JANE'].filter(option =>
            option.toLowerCase().startsWith(newText.toLowerCase())
          );
          setAutocompleteOptions(options);
          setShowAutocomplete(options.length > 0);
        } else {
          setShowAutocomplete(false);
        }
      };

      const handleAutocompleteSelect = (option: string) => {
        const newLines = [...lines];
        newLines[currentLineIndex] = { ...newLines[currentLineIndex], text: option };
        setLines(newLines);
        setShowAutocomplete(false);
      };

      const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newComment = event.target.value;
        setComments(prevComments => ({ ...prevComments, [index]: newComment }));
        setCurrentLineComment(newComment);
      };

      const handleAddComment = (index: number) => {
        if (!comments[index]) {
          setComments(prevComments => ({ ...prevComments, [index]: '' }));
        }
      };

      const handleFocus = (index: number) => {
        setCurrentLineIndex(index);
      };

      return (
        <div className="flex flex-col h-full p-6 bg-gray-900 text-white font-mono">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Screenwriting</h2>
            <div className="flex items-center space-x-2">
              <button className="bg-gray-800 hover:bg-gray-700 rounded-md p-2 text-sm">Export</button>
              <button className="bg-gray-800 hover:bg-gray-700 rounded-md p-2 text-sm">Share</button>
              <button onClick={() => setIsReadOnly(!isReadOnly)} className="bg-gray-800 hover:bg-gray-700 rounded-md p-2 text-sm">
                {isReadOnly ? 'Edit' : 'View'}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {lines.map((line, index) => (
              <div key={index} className={`mb-1 relative ${currentLineIndex === index ? 'bg-gray-800/50 rounded-md' : ''}`} ref={currentLineIndex === index ? currentLineRef : null}>
                <div className="flex items-start">
                  <div className="w-24 text-right text-gray-400 mr-2 uppercase text-xs">
                    {line.type}
                  </div>
                  <textarea
                    ref={el => textareaRefs.current[index] = el as HTMLTextAreaElement}
                    value={line.text}
                    onChange={(e) => handleTextChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => handleFocus(index)}
                    placeholder={line.type === 'action' ? 'Action...' : line.type === 'character' ? 'CHARACTER' : line.type === 'dialogue' ? 'Dialogue...' : line.type === 'parenthetical' ? '(Parenthetical)' : 'SCENE HEADING'}
                    className={`bg-transparent rounded-md p-1 w-full text-base focus:outline-none resize-none overflow-hidden
                      ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}
                      ${line.type === 'character' ? 'text-center' : ''}
                      ${line.type === 'dialogue' ? 'ml-24' : ''}
                      ${line.type === 'parenthetical' ? 'ml-24 italic' : ''}
                    `}
                    disabled={isReadOnly}
                    style={{ height: 'auto', minHeight: '24px', fontFamily: 'monospace' }}
                  />
                  {!isReadOnly && (
                    <button onClick={() => handleAddComment(index)} className="ml-2 text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </button>
                  )}
                </div>
                {showAutocomplete && currentLineIndex === index && (
                  <div className="absolute bg-gray-700 rounded-md mt-1 z-10">
                    {autocompleteOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAutocompleteSelect(option)}
                        className="block w-full text-left p-2 hover:bg-gray-600 text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {comments[index] !== undefined && (
                  <div className="mt-1 ml-24">
                    <textarea
                      value={comments[index]}
                      onChange={(e) => handleCommentChange(e, index)}
                      placeholder="Add a comment..."
                      className={`bg-gray-700 rounded-md p-1 w-full text-xs focus:outline-none resize-none overflow-hidden
                        ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={isReadOnly}
                      style={{ height: 'auto', minHeight: '20px' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default Screenwriting;
