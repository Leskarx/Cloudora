import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Key, Plus } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import FileCard from '../Common/FileCard';
import Pagination from '../Common/Pagination';
import { filesData } from '../../data/data';

const SharedFiles = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState(filesData);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomAction, setRoomAction] = useState('join'); // 'join' or 'create'
  const [roomData, setRoomData] = useState({
    roomId: '',
    password: '',
    roomName: ''
  });
  const [currentRoom, setCurrentRoom] = useState(null);
  
  const itemsPerPage = 8;

  // For demo purposes, we'll show all files as shared files
  // In a real app, this would be filtered based on sharing status
  const sharedFiles = files;

  // Filter files based on search query
  const filteredFiles = useMemo(() => {
    if (!searchQuery) return sharedFiles;
    return sharedFiles.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sharedFiles, searchQuery]);

  // Paginate files
  const paginatedFiles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFiles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFiles, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  // Handle file actions
  const handleFileAction = (action, file) => {
    switch (action) {
      case 'favorite':
        setFiles(prevFiles => 
          prevFiles.map(f => 
            f.id === file.id ? { ...f, isFavorite: !f.isFavorite } : f
          )
        );
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
          setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
        }
        break;
      case 'rename':
        const newName = prompt('Enter new name:', file.name);
        if (newName && newName.trim()) {
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.id === file.id ? { ...f, name: newName.trim() } : f
            )
          );
        }
        break;
      case 'share':
        alert(`Sharing "${file.name}"`);
        break;
      case 'download':
        alert(`Downloading "${file.name}"`);
        break;
      default:
        break;
    }
  };

  // Handle room modal
  const handleRoomSubmit = (e) => {
    e.preventDefault();
    
    if (roomAction === 'create') {
      // Create new room
      const newRoom = {
        id: Math.random().toString(36).substr(2, 9),
        name: roomData.roomName,
        password: roomData.password,
        createdBy: user.name,
        members: [user.name]
      };
      setCurrentRoom(newRoom);
      alert(`Room "${newRoom.name}" created successfully! Room ID: ${newRoom.id}`);
    } else {
      // Join existing room
      if (roomData.roomId && roomData.password) {
        const joinedRoom = {
          id: roomData.roomId,
          name: `Room ${roomData.roomId}`,
          password: roomData.password,
          members: [user.name]
        };
        setCurrentRoom(joinedRoom);
        alert(`Successfully joined room: ${roomData.roomId}`);
      }
    }
    
    setShowRoomModal(false);
    setRoomData({ roomId: '', password: '', roomName: '' });
  };

  // Handle file upload (simulated)
  const handleFileUpload = () => {
    if (!currentRoom) {
      alert('Please join or create a room first');
      return;
    }
    
    // Simulate file upload
    const newFile = {
      id: Date.now(),
      name: `Shared_File_${Date.now()}`,
      type: 'PDF file',
      size: '2.5 MB',
      icon: 'file-text',
      color: 'bg-blue-500',
      category: 'documents',
      uploadedBy: user.name,
      uploadDate: new Date().toISOString().split('T')[0],
      isFavorite: false
    };
    
    setFiles(prevFiles => [newFile, ...prevFiles]);
    alert('File uploaded to shared room successfully!');
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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <ArrowLeft size={20} />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Shared Files</h1>
                  <p className="text-gray-600">
                    {currentRoom ? `Room: ${currentRoom.name} (ID: ${currentRoom.id})` : 'Join or create a room to share files'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {!currentRoom ? (
                  <button
                    onClick={() => setShowRoomModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Users size={16} />
                    <span>Join/Create Room</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFileUpload}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus size={16} />
                    <span>Upload File</span>
                  </button>
                )}
              </div>
            </div>

            {/* Room Info */}
            {currentRoom && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-900">Connected to Room</h3>
                      <p className="text-sm text-blue-700">
                        Room ID: <span className="font-mono font-semibold">{currentRoom.id}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentRoom(null)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Leave Room
                  </button>
                </div>
              </div>
            )}

            {/* Files Section */}
            {currentRoom ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Shared Files ({filteredFiles.length})
                  </h2>
                  {searchQuery && (
                    <p className="text-sm text-gray-500">
                      {filteredFiles.length} result{filteredFiles.length !== 1 ? 's' : ''} found
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {paginatedFiles.length > 0 ? (
                    paginatedFiles.map((file) => (
                      <FileCard
                        key={file.id}
                        file={file}
                        showUploader={true}
                        onAction={handleFileAction}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Users className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No shared files</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery 
                          ? 'No files match your search criteria.'
                          : 'Upload files to share them with room members.'
                        }
                      </p>
                      <button
                        onClick={handleFileUpload}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} />
                        <span>Upload First File</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={filteredFiles.length}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Join or Create a Room</h3>
                <p className="text-gray-500 mb-6">
                  Connect with others to share files in real-time collaboration rooms.
                </p>
                <button
                  onClick={() => setShowRoomModal(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Users size={20} />
                  <span>Get Started</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {roomAction === 'join' ? 'Join Room' : 'Create Room'}
            </h2>

            {/* Action Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setRoomAction('join')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  roomAction === 'join' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Join Room
              </button>
              <button
                onClick={() => setRoomAction('create')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  roomAction === 'create' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Create Room
              </button>
            </div>

            <form onSubmit={handleRoomSubmit} className="space-y-4">
              {roomAction === 'create' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    value={roomData.roomName}
                    onChange={(e) => setRoomData(prev => ({ ...prev, roomName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter room name"
                    required
                  />
                </div>
              )}

              {roomAction === 'join' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room ID
                  </label>
                  <input
                    type="text"
                    value={roomData.roomId}
                    onChange={(e) => setRoomData(prev => ({ ...prev, roomId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter room ID"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="password"
                    value={roomData.password}
                    onChange={(e) => setRoomData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRoomModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {roomAction === 'join' ? 'Join Room' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedFiles;
