
import { useState } from "react";
import { getAllPhotos, getUserPhotos, Photo } from "@/services/photoService";
import { useAuth } from "@/context/AuthContext";
import PhotoCard from "./PhotoCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

interface PhotoGridProps {
  adminView?: boolean;
  refreshTrigger?: number;
}

const PhotoGrid = ({ adminView = false, refreshTrigger = 0 }: PhotoGridProps) => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (user) {
      // Get photos based on view type
      const fetchedPhotos = adminView 
        ? getAllPhotos() 
        : getUserPhotos(user.id);
      
      setPhotos(fetchedPhotos);
    }
  }, [user, adminView, refreshTrigger]);

  if (!user) {
    return null;
  }

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || photo.quality === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Cari berdasarkan judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter kualitas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="good">Kualitas Baik</SelectItem>
              <SelectItem value="bad">Kualitas Buruk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada foto ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
