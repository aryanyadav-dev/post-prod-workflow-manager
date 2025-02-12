import React, { useState, useRef } from 'react';
    import { File, Trash2 } from 'lucide-react';

    const Dropbox: React.FC = () => {
      const [files, setFiles] = useState<any[]>([]);
      const [previewUrl, setPreviewUrl] = useState<string | null>(null);
      const dropRef = useRef<HTMLDivElement>(null);

      const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };

      const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles(prevFiles => [...prevFiles, ...droppedFiles.map((file: any) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          dateAdded: new Date().toLocaleDateString(),
          file: file,
        }))]);
      };

      const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
         setFiles(prevFiles => [...prevFiles, ...selectedFiles.map((file: any) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          dateAdded: new Date().toLocaleDateString(),
          file: file,
        }))]);
      };

      const handleDeleteFile = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setPreviewUrl(null);
      };

      const handleViewFile = (file: any) => {
        if (file.type.startsWith('image/') || file.type === 'application/pdf' || file.type.startsWith('video/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file.file);
        } else {
          setPreviewUrl(null);
        }
      };

      const handleClosePreview = () => {
        setPreviewUrl(null);
      };

      return (
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Dropbox</h2>
            <button className="text-gray-400 hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M3 12h1M20 12h1M6.3 6.3l-.7-.7M17.7 17.7l-.7-.7M12 3v1M12 20v1M6.3 17.7l.7-.7M17.7 6.3l.7-.7"/></svg>
            </button>
          </div>

          <div
            ref={dropRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-md cursor-pointer mb-6
              border-gray-600 bg-gray-900 hover:bg-gray-800 h-64`}
          >
            <input
              type="file"
              className="hidden"
              id="file-upload"
              multiple
              onChange={handleFileSelect}
            />
            <label htmlFor="file-upload" className="cursor-pointer text-gray-400">
              Click here or drop a file to upload!
            </label>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">All Files</h3>
            <button className="text-gray-400 hover:text-gray-300 text-sm">Sort By Newest</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-500 border-b border-gray-700">
                <tr>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">Filename</th>
                  <th className="py-2 px-4">Date Added</th>
                  <th className="py-2 px-4">Size</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-2 px-4">
                        <File size={16} className="inline-block mr-1" />
                        {file.type.split('/')[1]}
                      </td>
                      <td className="py-2 px-4">{file.name}</td>
                      <td className="py-2 px-4">{file.dateAdded}</td>
                      <td className="py-2 px-4">{file.size} bytes</td>
                      <td className="py-2 px-4 flex items-center">
                        <button onClick={() => handleViewFile(file)} className="text-blue-500 hover:text-blue-400 mr-6">View</button>
                        <button onClick={() => handleDeleteFile(index)} className="text-red-500 hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">You have No Files.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {previewUrl && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-gray-800 rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto relative">
                <button onClick={handleClosePreview} className="absolute top-2 right-2 text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                {previewUrl && (
                  (previewUrl.startsWith('data:image/') && <img src={previewUrl} alt="Preview" className="max-w-full max-h-[70vh]"/>) ||
                  (previewUrl.startsWith('data:video/') && <video src={previewUrl} controls className="max-w-full max-h-[70vh]"/>) ||
                  (previewUrl.startsWith('data:application/pdf') && <iframe src={previewUrl} className="w-full h-[70vh]"></iframe>)
                )}
              </div>
            </div>
          )}
        </div>
      );
    };

    export default Dropbox;
