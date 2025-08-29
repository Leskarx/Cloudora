// Sample data for the application
export const filesData = [
  {
    id: 1,
    name: "IMG_0001",
    type: "PNG file",
    size: "5 MB",
    icon: "camera",
    color: "bg-purple-500",
    category: "pictures",
    uploadedBy: "John Doe",
    uploadDate: "2024-01-15",
    isFavorite: false
  },
  {
    id: 2,
    name: "Startup pitch",
    type: "AVI file",
    size: "105 MB",
    icon: "video",
    color: "bg-pink-500",
    category: "videos",
    uploadedBy: "Jane Smith",
    uploadDate: "2024-01-14",
    isFavorite: true
  },
  {
    id: 3,
    name: "Elon Musk Podcast",
    type: "MP3 file",
    size: "550 MB",
    icon: "mic",
    color: "bg-blue-500",
    category: "audio",
    uploadedBy: "Mike Johnson",
    uploadDate: "2024-01-13",
    isFavorite: false
  },
  {
    id: 4,
    name: "Resume",
    type: "PDF file",
    size: "10 MB",
    icon: "file-text",
    color: "bg-teal-500",
    category: "documents",
    uploadedBy: "Sarah Wilson",
    uploadDate: "2024-01-12",
    isFavorite: true
  },
  {
    id: 5,
    name: "Project Report",
    type: "DOCX file",
    size: "25 MB",
    icon: "file-text",
    color: "bg-blue-600",
    category: "documents",
    uploadedBy: "Alex Brown",
    uploadDate: "2024-01-11",
    isFavorite: false
  },
  {
    id: 6,
    name: "Vacation Photos",
    type: "JPG file",
    size: "15 MB",
    icon: "camera",
    color: "bg-green-500",
    category: "pictures",
    uploadedBy: "Emma Davis",
    uploadDate: "2024-01-10",
    isFavorite: true
  },
  {
    id: 7,
    name: "Meeting Recording",
    type: "MP4 file",
    size: "85 MB",
    icon: "video",
    color: "bg-red-500",
    category: "videos",
    uploadedBy: "Tom Wilson",
    uploadDate: "2024-01-09",
    isFavorite: false
  },
  {
    id: 8,
    name: "Budget Spreadsheet",
    type: "XLSX file",
    size: "3 MB",
    icon: "file-text",
    color: "bg-green-600",
    category: "documents",
    uploadedBy: "Lisa Chen",
    uploadDate: "2024-01-08",
    isFavorite: true
  }
];

export const foldersData = [
  {
    id: 1,
    name: "Work",
    fileCount: 820,
    icon: "briefcase",
    color: "bg-gray-500"
  },
  {
    id: 2,
    name: "Personal",
    fileCount: 115,
    icon: "user",
    color: "bg-blue-500"
  },
  {
    id: 3,
    name: "School",
    fileCount: 65,
    icon: "graduation-cap",
    color: "bg-pink-500"
  },
  {
    id: 4,
    name: "Archive",
    fileCount: 31,
    icon: "archive",
    color: "bg-blue-500"
  }
];

export const categoriesData = [
  {
    id: 1,
    name: "Pictures",
    count: 480,
    icon: "camera",
    color: "bg-purple-500",
    category: "pictures"
  },
  {
    id: 2,
    name: "Documents",
    count: 190,
    icon: "file-text",
    color: "bg-teal-500",
    category: "documents"
  },
  {
    id: 3,
    name: "Videos",
    count: 30,
    icon: "video",
    color: "bg-pink-500",
    category: "videos"
  },
  {
    id: 4,
    name: "Audio",
    count: 80,
    icon: "mic",
    color: "bg-blue-500",
    category: "audio"
  }
];

export const sharedFoldersData = [
  {
    id: 1,
    name: "Keynote Files",
    sharedWith: ["John", "Jane"],
    color: "bg-blue-100"
  },
  {
    id: 2,
    name: "Vacation Photos",
    sharedWith: ["Mike", "Sarah"],
    color: "bg-purple-100"
  },
  {
    id: 3,
    name: "Project Report",
    sharedWith: ["Alex", "Emma"],
    color: "bg-pink-100"
  }
];

// User data for authentication
export const userData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/api/placeholder/40/40",
  storageUsed: 75,
  storageTotal: 100
};
