import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, onUpload, disabled = false }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelection(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
          ${dragActive 
            ? 'border-neon-green bg-neon-green/5' 
            : 'border-dark-border hover:border-neon-green/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={disabled ? undefined : handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="File upload area. Click to select files or drag and drop files here."
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          disabled={disabled}
          accept=".json,.csv,.txt,.pdf,.png,.jpg,.jpeg,.mp4,.mp3"
          aria-label="File input"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center
            ${dragActive ? 'bg-neon-green/20' : 'bg-dark-card'}`}>
            <Upload className={`w-8 h-8 ${dragActive ? 'text-neon-green' : 'text-gray-400'}`} />
          </div>
          
          <div>
            <p className="text-lg font-medium mb-1">
              {dragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-gray-400 text-sm">
              Or click to browse • Supports JSON, CSV, images, videos, and more
            </p>
          </div>
        </div>
      </div>

      {/* Selected File Display */}
      {selectedFile && (
        <div className="flex items-center justify-between p-4 glass rounded-lg border border-neon-blue/20">
          <div className="flex items-center space-x-3">
            <File className="w-5 h-5 text-neon-blue" />
            <div>
              <p className="font-medium text-sm">{selectedFile.name}</p>
              <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleUpload}
              disabled={disabled}
              className="px-4 py-2 bg-neon-green/20 border border-neon-green/30 rounded-lg
                         hover:bg-neon-green/30 hover:border-neon-green/50 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              aria-label="Upload and tokenize file"
            >
              Upload & Tokenize
            </button>
            <button
              onClick={clearFile}
              disabled={disabled}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed text-red-400"
              aria-label="Remove selected file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
