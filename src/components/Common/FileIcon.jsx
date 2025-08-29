import React from 'react';
import { 
  Camera, 
  FileText, 
  Video, 
  Mic, 
  File,
  Briefcase,
  User,
  GraduationCap,
  Archive
} from 'lucide-react';

const FileIcon = ({ icon, color, size = 20 }) => {
  // Icon mapping
  const iconMap = {
    camera: Camera,
    'file-text': FileText,
    video: Video,
    mic: Mic,
    file: File,
    briefcase: Briefcase,
    user: User,
    'graduation-cap': GraduationCap,
    archive: Archive
  };

  const IconComponent = iconMap[icon] || File;

  return (
    <div className={`${color} p-3 rounded-lg flex items-center justify-center`}>
      <IconComponent size={size} className="text-white" />
    </div>
  );
};

export default FileIcon;
