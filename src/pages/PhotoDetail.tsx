
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPhotoById, Photo } from "@/services/photoService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchedPhoto = getPhotoById(id);
      if (fetchedPhoto) {
        setPhoto(fetchedPhoto);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center my-12">
          <h2 className="text-2xl font-bold mb-4">Foto tidak ditemukan</h2>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(photo.uploadDate), "dd MMMM yyyy, HH:mm");
  const scorePercentage = Math.round(photo.score * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-card rounded-lg overflow-hidden">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full object-contain max-h-[500px]"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{photo.title}</h1>
            <p className="text-muted-foreground mt-2">{formattedDate}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Hasil Analisis</h2>
            <div className="flex items-center mb-4">
              <div className="mr-3">
                {photo.quality === "good" ? (
                  <Badge className="bg-photo-good hover:bg-photo-good/80 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Kualitas Baik
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="h-3 w-3 mr-1" />
                    Kualitas Buruk
                  </Badge>
                )}
              </div>
              <div>
                <span className="font-medium">Score: {scorePercentage}%</span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Detail Parameter</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Brightness</span>
                    <span className="text-sm font-medium">{Math.round(photo.features.brightness * 100)}%</span>
                  </div>
                  <Progress value={photo.features.brightness * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Contrast</span>
                    <span className="text-sm font-medium">{Math.round(photo.features.contrast * 100)}%</span>
                  </div>
                  <Progress value={photo.features.contrast * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Sharpness</span>
                    <span className="text-sm font-medium">{Math.round(photo.features.sharpness * 100)}%</span>
                  </div>
                  <Progress value={photo.features.sharpness * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Noise (Lower is better)</span>
                    <span className="text-sm font-medium">{Math.round(photo.features.noise * 100)}%</span>
                  </div>
                  <Progress 
                    value={photo.features.noise * 100} 
                    className="bg-red-200" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Color Balance</span>
                    <span className="text-sm font-medium">{Math.round(photo.features.colorBalance * 100)}%</span>
                  </div>
                  <Progress value={photo.features.colorBalance * 100} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
