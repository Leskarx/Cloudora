import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';

const UploadFiles = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Process selected files
  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const fileId = Date.now() + Math.random();
      const fileData = {
        id: fileId,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || 'Unknown',
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [...prev, fileData]);
      simulateUpload(fileId);
    });
  };

  // Simulate file upload with progress
  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'completed', progress: 100 }
              : file
          )
        );
      } else {
        setUploadedFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { ...file, progress: Math.round(progress) }
              : file
          )
        );
      }
    }, 200);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Remove file from upload list
  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Clear all files
  const clearAllFiles = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          searchQuery=""
          onSearchChange={() => {}}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center space-x-4 mb-6">
              <Link
                to="/"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Upload Files</h1>
                <p className="text-gray-600">
                  Drag and drop files or click to browse
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div className="mb-8">
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                    dragActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Upload className={`w-8 h-8 ${
                      dragActive ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {dragActive ? 'Drop files here' : 'Upload your files'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop files here, or click to browse
                    </p>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload size={16} className="mr-2" />
                      Choose Files
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Supports: Images, Documents, Videos, Audio files (Max 100MB each)
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upload Progress ({uploadedFiles.length} files)
                  </h2>
                  <button
                    onClick={clearAllFiles}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      {/* File Icon */}
                      <div className="flex-shrink-0">
                        {file.status === 'completed' ? (
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : file.status === 'error' ? (
                          <AlertCircle className="w-8 h-8 text-red-500" />
                        ) : (
                          <File className="w-8 h-8 text-blue-500" />
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                        <p className="text-sm text-gray-500">{file.size}</p>
                        
                        {/* Progress Bar */}
                        {file.status === 'uploading' && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Uploading...</span>
                              <span>{file.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {file.status === 'completed' && (
                          <p className="text-sm text-green-600 mt-1">Upload completed</p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {uploadedFiles.filter(f => f.status === 'completed').length} of {uploadedFiles.length} files uploaded
                    </span>
                    <span className="text-gray-600">
                      Total size: {uploadedFiles.reduce((acc, file) => acc + parseFloat(file.size), 0).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Tips */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Upload Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• You can upload multiple files at once by selecting them or dragging them together</li>
                <li>• Supported formats: Images (JPG, PNG, GIF), Documents (PDF, DOC, TXT), Videos (MP4, AVI), Audio (MP3, WAV)</li>
                <li>• Maximum file size is 100MB per file</li>
                <li>• Files are automatically organized by type in your cloud storage</li>
                <li>• You can rename, share, or organize files after upload</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadFiles;
