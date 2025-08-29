import React, { useState } from 'react';
import { MoreHorizontal, Share2, Star, Edit3, Trash2, Download } from 'lucide-react';
import FileIcon from './FileIcon';

const FileCard = ({ file, showUploader = false, onAction }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Handle menu actions
  const handleAction = (action) => {
    setShowMenu(false);
    if (onAction) {
      onAction(action, file);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between">
        {/* File info */}
        <div className="flex items-center space-x-3 flex-1">
          <FileIcon icon={file.icon} color={file.color} />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span>{file.type}</span>
              <span>•</span>
              <span>{file.size}</span>
              {showUploader && file.uploadedBy && (
                <>
                  <span>•</span>
                  <span>by {file.uploadedBy}</span>
                </>
              )}
            </div>
            {file.uploadDate && (
              <p className="text-xs text-gray-400 mt-1">
                Uploaded on {new Date(file.uploadDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Share button */}
          <button
            onClick={() => handleAction('share')}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Share"
          >
            <Share2 size={16} />
          </button>

          {/* More actions menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
            >
              <MoreHorizontal size={16} />
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => handleAction('download')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => handleAction('rename')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit3 size={16} />
                  <span>Rename</span>
                </button>
                <button
                  onClick={() => handleAction('favorite')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Star size={16} className={file.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''} />
                  <span>{file.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => handleAction('delete')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
