
import { toast } from "sonner";

export interface Photo {
  id: string;
  userId: string;
  imageUrl: string;
  title: string;
  uploadDate: string;
  quality: "good" | "bad" | "pending";
  score: number;
  certaintyFactor: number; // Added CF value
  features: {
    brightness: number;
    contrast: number;
    sharpness: number;
    noise: number;
    colorBalance: number;
  };
  featuresCF: { // Added CF values for each feature
    brightnessCF: number;
    contrastCF: number;
    sharpnessCF: number;
    noiseCF: number;
    colorBalanceCF: number;
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
    certaintyFactor: 0.92, // High certainty
    features: {
      brightness: 0.78,
      contrast: 0.82,
      sharpness: 0.91,
      noise: 0.12,
      colorBalance: 0.85,
    },
    featuresCF: {
      brightnessCF: 0.85,
      contrastCF: 0.88,
      sharpnessCF: 0.94,
      noiseCF: 0.95,
      colorBalanceCF: 0.90,
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
    certaintyFactor: 0.95, // Very high certainty
    features: {
      brightness: 0.85,
      contrast: 0.89,
      sharpness: 0.94,
      noise: 0.08,
      colorBalance: 0.91,
    },
    featuresCF: {
      brightnessCF: 0.92,
      contrastCF: 0.94,
      sharpnessCF: 0.96,
      noiseCF: 0.97,
      colorBalanceCF: 0.93,
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
    certaintyFactor: 0.88, // Good certainty despite bad quality
    features: {
      brightness: 0.22,
      contrast: 0.45,
      sharpness: 0.38,
      noise: 0.78,
      colorBalance: 0.41,
    },
    featuresCF: {
      brightnessCF: 0.82,
      contrastCF: 0.75,
      sharpnessCF: 0.86,
      noiseCF: 0.89,
      colorBalanceCF: 0.78,
    },
  },
];

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Calculate Certainty Factor for a feature
const calculateFeatureCF = (value: number, threshold: number, importance: number): number => {
  // Calculate distance from threshold, normalized by importance
  const distanceFromThreshold = Math.abs(value - threshold) * importance;
  
  // Convert to a certainty value (0-1)
  return Math.min(0.98, 0.7 + distanceFromThreshold);
};

// Combine multiple CFs using CF combination rule
const combineCFs = (cfs: number[]): number => {
  // Implementation of CF combination rule
  let combinedCF = cfs[0];
  
  for (let i = 1; i < cfs.length; i++) {
    if (combinedCF >= 0 && cfs[i] >= 0) {
      // Both positive: CF1 + CF2 * (1 - CF1)
      combinedCF = combinedCF + cfs[i] * (1 - combinedCF);
    } else if (combinedCF < 0 && cfs[i] < 0) {
      // Both negative: CF1 + CF2 * (1 + CF1)
      combinedCF = combinedCF + cfs[i] * (1 + combinedCF);
    } else {
      // One positive, one negative: (CF1 + CF2) / (1 - Math.min(Math.abs(CF1), Math.abs(CF2)))
      combinedCF = (combinedCF + cfs[i]) / (1 - Math.min(Math.abs(combinedCF), Math.abs(cfs[i])));
    }
  }
  
  return combinedCF;
};

// Simulate combined SVM-CF analysis with features extraction
const analyzeSVMWithCF = async (file: File): Promise<{
  features: Photo["features"],
  featuresCF: Photo["featuresCF"],
  quality: Photo["quality"],
  score: number,
  certaintyFactor: number
}> => {
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
  
  // Calculate CFs for each feature
  const brightnessCF = calculateFeatureCF(brightness, 0.65, 0.8);
  const contrastCF = calculateFeatureCF(contrast, 0.7, 0.9);
  const sharpnessCF = calculateFeatureCF(sharpness, 0.75, 1.0);
  const noiseCF = calculateFeatureCF(1 - noise, 0.8, 0.7); // Invert noise for CF (low noise is good)
  const colorBalanceCF = calculateFeatureCF(colorBalance, 0.7, 0.6);
  
  // Combine all CFs
  const combinedCF = combineCFs([brightnessCF, contrastCF, sharpnessCF, noiseCF, colorBalanceCF]);
  
  // Calculate overall score (SVM part)
  const score = (brightness * 0.2 + contrast * 0.2 + sharpness * 0.3 + (1 - noise) * 0.2 + colorBalance * 0.1);
  
  // Determine quality based on score
  const quality = score > 0.6 ? "good" : "bad";
  
  return {
    features: {
      brightness,
      contrast,
      sharpness,
      noise,
      colorBalance,
    },
    featuresCF: {
      brightnessCF,
      contrastCF,
      sharpnessCF,
      noiseCF,
      colorBalanceCF,
    },
    quality,
    score,
    certaintyFactor: combinedCF
  };
};

// Upload a photo
export const uploadPhoto = async (userId: string, file: File, title: string): Promise<Photo> => {
  try {
    // Create URL for the image
    const imageUrl = URL.createObjectURL(file);
    
    // Analyze the image using SVM with CF
    const analysis = await analyzeSVMWithCF(file);
    
    // Create new photo entry
    const newPhoto: Photo = {
      id: generateId(),
      userId,
      imageUrl,
      title,
      uploadDate: new Date().toISOString(),
      quality: analysis.quality,
      score: analysis.score,
      certaintyFactor: analysis.certaintyFactor,
      features: analysis.features,
      featuresCF: analysis.featuresCF,
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
