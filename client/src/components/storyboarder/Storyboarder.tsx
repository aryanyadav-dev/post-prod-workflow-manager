import React from 'react';

    const Storyboarder: React.FC = () => {
      return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
          {/* Brush Tools */}
          <div className="bg-gray-800 p-3 flex items-center justify-start space-x-3 border-b border-gray-700">
            <div className="w-8 h-8 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-line"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/><path d="M22 21v-2"/></svg>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brush"><path d="M3 12V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5"/><path d="m2 17 4 4 4-4"/><path d="M10 21v-4"/></svg>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eraser"><path d="M4 4 20 20"/><path d="M16 4 4 16v4h4L20 8"/></svg>
            </div>
            <div className="ml-4 w-20 h-8 bg-gray-700 rounded-md cursor-pointer text-xs text-gray-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette mr-1"><path d="M16 7h-1a4 4 0 0 0-4 4v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V11a4 4 0 0 0-4-4z"/><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M12 17v-2a2 2 0 0 1 2-2h2"/></svg>
              Color
            </div>
            <div className="ml-auto w-8 h-8 bg-gray-700 rounded-full cursor-pointer flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sketch Pane */}
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="bg-gray-800 w-[700px] h-[400px] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                {/* Empty Sketch Content */}
              </div>
            </div>

            {/* Metadata Panel */}
            <div className="w-80 p-4 bg-gray-800 border-l border-gray-700 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Shot: 2G</h3>
                <p className="text-sm text-gray-400">Board: 8 of 100</p>
                <p className="text-sm text-gray-400">0.4 line miles</p>
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded-sm text-blue-500 focus:ring-blue-500 h-4 w-4" />
                  <span className="text-sm">New Shot?</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-400">Duration</label>
                <div className="flex items-center space-x-2">
                  <input type="text" className="bg-gray-700 rounded-md p-1 text-sm w-16" defaultValue="800" />
                  <input type="text" className="bg-gray-700 rounded-md p-1 text-sm w-10" defaultValue="19" />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-400">Dialogue</label>
                <textarea className="bg-gray-700 rounded-md p-1 text-sm w-full h-20"></textarea>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-400">Action</label>
                <textarea className="bg-gray-700 rounded-md p-1 text-sm w-full h-20"></textarea>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">Notes</label>
                <button className="text-sm text-gray-400 hover:text-gray-300">Clear</button>
              </div>
              <textarea className="bg-gray-700 rounded-md p-1 text-sm w-full h-20"></textarea>
            </div>
          </div>

          {/* Board Drawer */}
          <div className="bg-gray-800 p-2 flex items-center justify-between border-t border-gray-700">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
              <div className="w-20 h-12 bg-gray-700 rounded-md cursor-pointer"></div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rewind"><polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/></svg>
              </button>
              <button className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-back"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="20" y2="4"/></svg>
              </button>
              <button className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="3 20 19 12 3 4 3 20"/></svg>
              </button>
              <button className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-skip-forward"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="4" y2="20"/></svg>
              </button>
              <button className="text-gray-400 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-fast-forward"><polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/></svg>
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default Storyboarder;
