import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Plus } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import FileIcon from '../Common/FileIcon';
import FileCard from '../Common/FileCard';
import Pagination from '../Common/Pagination';
import { filesData, foldersData, categoriesData } from '../../data/data';

const Dashboard = ({ user, onLogout }) => {
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState(filesData);
  
  const itemsPerPage = 4; // Show 4 recent files per page

  // Filter files based on search query
  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    return files.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  // Paginate recent files
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
            {/* Categories Section */}
            <section className="w-full mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
              <div className=" w-full   flex justify-between  ">
                <div className=' w-full lg:w-[66%]   grid grid-cols-2 md:grid-cols-4 gap-4'>
                {categoriesData.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.category}`}
                    className="block"
                  >
                    <div className={`${category.color} rounded-lg py-6 hover:shadow-lg transition-all duration-200 border  group`}>
                      <div className="flex flex-col items-start pl-3 justify-center">
                        <FileIcon size={30} icon={category.icon} color={category.color} />
                        <div className=' text-center'>
                          <h3 className="font-bold text-white  transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-white">{category.count} files</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                </div>
                
                {/* right side upload for desktop */}
                <div className="bg-white rounded-lg lg:block hidden lg:w-[32.3%]  p-6 border border-gray-200">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Add new files</h3>
                    <Link
                      to="/upload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Upload size={16} className="mr-2" />
                      Upload Files
                    </Link>
                  </div>
                </div>
                
              </div>
              
            </section>

            {/* Files and Storage Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Files Section */}
              <div className="lg:col-span-2">

                {/* Folders */}
                <section className="hidden mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Files</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {foldersData.map((folder) => (
                      <div
                        key={folder.id}
                        className="bg-white rounded-lg p-4 hover:shadow-md transition-all duration-200 border border-gray-200 cursor-pointer group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <FileIcon icon={folder.icon} color={folder.color} />
                          <h3 className="font-medium text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
                            {folder.name}
                          </h3>
                          <p className="text-sm text-gray-500">{folder.fileCount} files</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add New Folder */}
                    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-all duration-200 border-2 border-dashed border-gray-300 cursor-pointer group hover:border-blue-400">
                      <div className="flex flex-col items-center text-center">
                        <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-blue-50 transition-colors">
                          <Plus size={20} className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <h3 className="font-medium text-gray-500 mt-2 group-hover:text-blue-600 transition-colors">
                          New Folder
                        </h3>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Recent Files */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Files</h2>
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
                      <div className="text-center py-8">
                        <p className="text-gray-500">
                          {searchQuery ? 'No files found matching your search.' : 'No recent files.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={filteredFiles.length}
                    />
                  )}
                </section>
              </div>

              {/* Right Sidebar */}
              <div className=" space-y-6">
                {/* Add New Files */}
                <div className="bg-white rounded-lg block lg:hidden lg:w-[32.3%]  p-6 border border-gray-200">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Add new files</h3>
                    <Link
                      to="/upload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Upload size={16} className="mr-2" />
                      Upload Files
                    </Link>
                  </div>
                </div>

                {/* Storage Info */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Storage</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Used</span>
                      <span className="font-medium">75 GB of 100 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500">25% left</p>
                  </div>
                </div>

                {/* Shared Folders */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Your Shared Folders</h3>
                    <Link
                      to="/shared-files"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Keynote Files", users: ["John", "Jane"] },
                      { name: "Vacation Photos", users: ["Mike", "Sarah"] },
                      { name: "Project Report", users: ["Alex", "Emma"] }
                    ].map((folder, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">{folder.name}</span>
                        <div className="flex -space-x-1">
                          {folder.users.slice(0, 2).map((user, userIndex) => (
                            <div
                              key={userIndex}
                              className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white border-2 border-white"
                            >
                              {user.charAt(0)}
                            </div>
                          ))}
                          {folder.users.length > 2 && (
                            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white border-2 border-white">
                              +{folder.users.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    + Add More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
