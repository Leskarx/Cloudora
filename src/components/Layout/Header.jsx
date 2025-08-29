import React from 'react';
import { Search, Menu } from 'lucide-react';

const Header = ({ onMenuClick, searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search files, folders..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right side - could add notifications, user menu, etc. */}
        <div className="flex items-center space-x-4">
          {/* Placeholder for additional header items */}
        </div>
      </div>
    </header>
  );
};

export default Header;
