
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { uploadPhoto } from "@/services/photoService";
import { toast } from "sonner";
import { Upload, Image, Loader } from "lucide-react";

interface PhotoUploaderProps {
  onUploadSuccess: () => void;
}

const PhotoUploader = ({ onUploadSuccess }: PhotoUploaderProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"]
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Anda harus login terlebih dahulu");
      return;
    }
    
    if (!file) {
      toast.error("Pilih foto terlebih dahulu");
      return;
    }
    
    if (!title.trim()) {
      toast.error("Masukkan judul foto");
      return;
    }
    
    try {
      setIsUploading(true);
      toast.info("Menganalisis kualitas foto...");
      
      await uploadPhoto(user.id, file, title);
      
      toast.success("Foto berhasil diupload dan dianalisis");
      setFile(null);
      setPreview(null);
      setTitle("");
      onUploadSuccess();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Gagal mengupload foto");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="photo-title">Judul Foto</Label>
          <Input
            id="photo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul foto"
            disabled={isUploading}
          />
        </div>

        <div className="space-y-2">
          <Label>Upload Foto</Label>
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "dropzone-active" : ""} ${preview ? "border-primary" : ""}`}
          >
            <input {...getInputProps()} />
            
            {preview ? (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 mx-auto object-contain rounded"
                />
                <p className="text-sm text-muted-foreground">
                  Klik atau drop foto lain untuk mengganti
                </p>
              </div>
            ) : isDragActive ? (
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p>Lepaskan file di sini ...</p>
              </div>
            ) : (
              <div className="text-center">
                <Image className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p>Klik atau drag & drop foto di sini</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Format: JPG, PNG (Maks. 5MB)
                </p>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={!file || !title || isUploading}
        >
          {isUploading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Menganalisis...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload & Analisis
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PhotoUploader;
