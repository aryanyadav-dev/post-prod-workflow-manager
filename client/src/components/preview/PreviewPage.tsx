'use client'

import React, { useState, useRef, useEffect, DragEvent } from 'react';
import { Monitor, Image, Wand2, Music, Volume2, Download, Maximize2, Settings, ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward, RotateCcw, Search, Upload, X, View } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'video' | 'image' | 'audio';
  thumbnail?: string;
}

export function PreviewPage() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaPool, setMediaPool] = useState<MediaItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const generateThumbnail = (videoElement: HTMLVideoElement): string => {
    const canvas = thumbnailCanvasRef.current;
    if (!canvas) return '';

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '';

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  };

  const processVideoFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const tempVideo = document.createElement('video');
    
    tempVideo.src = url;
    tempVideo.addEventListener('loadedmetadata', () => {
      tempVideo.currentTime = tempVideo.duration / 2;
    });
    
    tempVideo.addEventListener('timeupdate', () => {
      const thumbnail = generateThumbnail(tempVideo);
      
      const mediaItem: MediaItem = {
        id: Date.now().toString(),
        name: file.name,
        url: url,
        type: 'video',
        thumbnail: thumbnail
      };

      setMediaPool(prevMedia => [...prevMedia, mediaItem]);
      setVideoSrc(url);
      tempVideo.remove();
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      processVideoFile(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        processVideoFile(file);
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeVideo = () => {
    setVideoSrc(null);
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeMediaItem = (id: string) => {
    setMediaPool(prevMedia => prevMedia.filter(item => item.id !== id));
    
    if (mediaPool.find(item => item.id === id)?.url === videoSrc) {
      removeVideo();
    }
  };

  const loadVideo = (mediaItem: MediaItem) => {
    setVideoSrc(mediaItem.url);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [videoSrc]);

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-gray-300">
      <canvas ref={thumbnailCanvasRef} className="hidden"></canvas>
      <div className="flex flex-1">
        <div className="w-64 bg-[#232323] border-r border-gray-800 flex flex-col">
          <div className="p-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Media Pool</span>
              <Search className="w-4 h-4" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mediaPool.map((media) => (
                <div 
                  key={media.id} 
                  className="relative aspect-video bg-gray-800 rounded-sm cursor-pointer hover:opacity-80"
                  onClick={() => loadVideo(media)}
                >
                  <img 
                    src={media.thumbnail} 
                    alt={media.name} 
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMediaItem(media.id);
                    }}
                    className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-red-500/50 transition-colors"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {mediaPool.length < 6 && (
                <div 
                  onClick={triggerFileUpload}
                  className="aspect-video bg-gray-700 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="video/*"
              className="hidden"
            />
          </div>
          <div className="mt-4 p-2">
            <span className="text-sm font-medium">Effects</span>
            <div className="mt-2 space-y-1">
              {['Video Transitions', 'Audio Transitions', 'Titles', 'Generators', 'Effects'].map((item) => (
                <div key={item} className="text-sm text-gray-400 hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div 
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`h-3/5 bg-black p-1 ${isDragOver ? 'border-4 border-blue-500' : ''}`}
          >
            <div 
              className={`bg-[#1E1E1E] h-full flex items-center justify-center relative 
                ${isDragOver ? 'bg-blue-900/30' : ''}`}
            >
              {videoSrc ? (
                <>
                  <video 
                    ref={videoRef}
                    src={videoSrc} 
                    className="max-h-full max-w-full" 
                  />
                  <button 
                    onClick={removeVideo}
                    className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <span className="text-gray-600 block mb-4">Drag and Drop or</span>
                  <button 
                    onClick={triggerFileUpload}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="video/*"
                    className="hidden"
                  />
                  {isDragOver && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <span className="text-white text-lg">Drop your video here</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 bg-[#232323] border-t border-gray-800">
            <div className="flex items-center justify-center h-10 border-b border-gray-800">
              <div className="flex items-center space-x-4">
                <ChevronLeft className="w-4 h-4" />
                <SkipBack className="w-4 h-4 cursor-pointer" onClick={handleSkipBackward} />
                <button onClick={togglePlay} className="focus:outline-none">
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <SkipForward className="w-4 h-4 cursor-pointer" onClick={handleSkipForward} />
                <ChevronRight className="w-4 h-4" />
                <RotateCcw className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex flex-1">
              <div className="w-32 border-r border-gray-800 p-2">
                <div className="space-y-2">
                  {['V4', 'V3', 'V2', 'V1', 'A4', 'A3', 'A2', 'A1'].map((track) => (
                    <div key={track} className="flex items-center">
                      <span className="text-xs text-gray-400">{track}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex flex-col">
                  {['V4', 'V3', 'V2', 'V1', 'A4', 'A3', 'A2', 'A1'].map((track, index) => (
                    <div key={track} className="flex-1 border-b border-gray-800">
                      {index === 3 && videoSrc && (
                        <div 
                          className="h-full bg-blue-500 opacity-50"
                          style={{width: `${(currentTime / duration) * 100}%`}}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
                {videoSrc && (
                  <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-between px-2 text-xs">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-64 bg-[#232323] border-l border-gray-800">
          <div className="flex items-center justify-center h-full text-gray-500">
            Nothing to inspect
          </div>
        </div>
      </div>
    </div>
  );
}