import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import FileCard from '../Common/FileCard';
import Pagination from '../Common/Pagination';
import { filesData } from '../../data/data';

const Favorites = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState(filesData);
  
  const itemsPerPage = 8;

  // Filter favorite files and apply search
  const filteredFiles = useMemo(() => {
    let favoriteFiles = files.filter(file => file.isFavorite);
    
    if (searchQuery) {
      favoriteFiles = favoriteFiles.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return favoriteFiles;
  }, [files, searchQuery]);

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
            <div className="flex items-center space-x-4 mb-6">
              <Link
                to="/"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Favorite Files</h1>
                <p className="text-gray-600">
                  {filteredFiles.length} favorite file{filteredFiles.length !== 1 ? 's' : ''}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </div>

            {/* Files Grid */}
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
                    <Star className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite files</h3>
                  <p className="text-gray-500">
                    {searchQuery 
                      ? 'No favorite files match your search criteria.'
                      : 'Files you mark as favorites will appear here.'
                    }
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
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
        </main>
      </div>
    </div>
  );
};

export default Favorites;
