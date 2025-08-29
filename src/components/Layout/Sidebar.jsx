import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Cloud, 
  Share2, 
  Star, 
  Upload, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ user, onLogout, isOpen, onClose }) => {
  const location = useLocation();

  // Navigation items configuration
  const navigationItems = [
    {
      name: 'My cloud',
      path: '/',
      icon: Cloud,
      active: location.pathname === '/'
    },
    {
      name: 'Shared Files',
      path: '/shared-files',
      icon: Share2,
      active: location.pathname === '/shared-files'
    },
    {
      name: 'Favorites',
      path: '/favorites',
      icon: Star,
      active: location.pathname === '/favorites'
    },
    {
      name: 'Upload Files',
      path: '/upload',
      icon: Upload,
      active: location.pathname === '/upload'
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-blue-900 text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-blue-800 rounded-lg lg:hidden"
        >
          <X size={20} />
        </button>

        {/* User Profile Section */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">{user?.name || 'User'}</h3>
              <p className="text-blue-300 text-xs">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${item.active 
                        ? 'bg-blue-800 text-white' 
                        : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-blue-800">
          <Link
            to="/settings"
            onClick={onClose}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mb-2
              ${location.pathname === '/settings'
                ? 'bg-blue-800 text-white' 
                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }
            `}
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-200 hover:bg-red-600 hover:text-white transition-all duration-200 w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
