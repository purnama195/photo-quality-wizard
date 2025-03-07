
import { toast } from "sonner";

export interface Photo {
  id: string;
  userId: string;
  imageUrl: string;
  title: string;
  uploadDate: string;
  quality: "good" | "bad" | "pending";
  score: number;
  features: {
    brightness: number;
    contrast: number;
    sharpness: number;
    noise: number;
    colorBalance: number;
  };
}

// Sample data for demo
let PHOTOS: Photo[] = [
  {
    id: "1",
    userId: "2",
    imageUrl: "https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=800&auto=format&fit=crop",
    title: "Studio Portrait 1",
    uploadDate: "2023-09-12T15:30:00Z",
    quality: "good",
    score: 0.87,
    features: {
      brightness: 0.78,
      contrast: 0.82,
      sharpness: 0.91,
      noise: 0.12,
      colorBalance: 0.85,
    },
  },
  {
    id: "2",
    userId: "2",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
    title: "Studio Portrait 2",
    uploadDate: "2023-09-10T10:15:00Z",
    quality: "good",
    score: 0.92,
    features: {
      brightness: 0.85,
      contrast: 0.89,
      sharpness: 0.94,
      noise: 0.08,
      colorBalance: 0.91,
    },
  },
  {
    id: "3",
    userId: "2",
    imageUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&auto=format&fit=crop",
    title: "Low Light Portrait",
    uploadDate: "2023-09-05T18:45:00Z",
    quality: "bad",
    score: 0.34,
    features: {
      brightness: 0.22,
      contrast: 0.45,
      sharpness: 0.38,
      noise: 0.78,
      colorBalance: 0.41,
    },
  },
];

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Simulate SVM analysis with features extraction
const analyzeSVM = async (file: File): Promise<Photo["features"] & { quality: Photo["quality"], score: number }> => {
  // This would be the actual SVM model in a real implementation
  // Here we're just using random values for the demo
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate random features - in a real app, these would come from image analysis
  const brightness = Math.random() * 0.3 + 0.5; // Range 0.5-0.8
  const contrast = Math.random() * 0.3 + 0.5; // Range 0.5-0.8
  const sharpness = Math.random() * 0.4 + 0.5; // Range 0.5-0.9
  const noise = Math.random() * 0.5; // Range 0-0.5
  const colorBalance = Math.random() * 0.3 + 0.6; // Range 0.6-0.9
  
  // Calculate overall score
  const score = (brightness * 0.2 + contrast * 0.2 + sharpness * 0.3 + (1 - noise) * 0.2 + colorBalance * 0.1);
  
  // Determine quality based on score
  const quality = score > 0.6 ? "good" : "bad";
  
  return {
    brightness,
    contrast,
    sharpness,
    noise,
    colorBalance,
    quality,
    score
  };
};

// Upload a photo
export const uploadPhoto = async (userId: string, file: File, title: string): Promise<Photo> => {
  try {
    // Create URL for the image
    const imageUrl = URL.createObjectURL(file);
    
    // Analyze the image using SVM
    const analysis = await analyzeSVM(file);
    
    // Create new photo entry
    const newPhoto: Photo = {
      id: generateId(),
      userId,
      imageUrl,
      title,
      uploadDate: new Date().toISOString(),
      quality: analysis.quality,
      score: analysis.score,
      features: {
        brightness: analysis.brightness,
        contrast: analysis.contrast,
        sharpness: analysis.sharpness,
        noise: analysis.noise,
        colorBalance: analysis.colorBalance,
      },
    };
    
    // Add to photos array (in a real app, this would be a database call)
    PHOTOS = [newPhoto, ...PHOTOS];
    
    return newPhoto;
  } catch (error) {
    console.error("Error uploading photo:", error);
    toast.error("Gagal mengupload foto. Silakan coba lagi.");
    throw error;
  }
};

// Get photos for a specific user
export const getUserPhotos = (userId: string): Photo[] => {
  return PHOTOS.filter(photo => photo.userId === userId);
};

// Get all photos (admin only)
export const getAllPhotos = (): Photo[] => {
  return PHOTOS;
};

// Get a specific photo by ID
export const getPhotoById = (photoId: string): Photo | undefined => {
  return PHOTOS.find(photo => photo.id === photoId);
};
