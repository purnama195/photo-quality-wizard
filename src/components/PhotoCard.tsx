
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Photo } from "@/services/photoService";
import { format } from "date-fns";
import { BarChart, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const formattedDate = format(new Date(photo.uploadDate), "dd MMMM yyyy");
  
  const getQualityBadge = () => {
    if (photo.quality === "good") {
      return (
        <Badge className="bg-photo-good hover:bg-photo-good/80">
          <CheckCircle className="h-3 w-3 mr-1" />
          Baik
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Buruk
        </Badge>
      );
    }
  };

  const getCertaintyBadge = () => {
    if (photo.certaintyFactor >= 0.9) {
      return (
        <span className="text-xs text-emerald-600 font-medium flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          CF: {Math.round(photo.certaintyFactor * 100)}%
        </span>
      );
    } else if (photo.certaintyFactor >= 0.7) {
      return (
        <span className="text-xs text-amber-600 font-medium flex items-center">
          <CheckCircle className="h-3 w-3 mr-1" />
          CF: {Math.round(photo.certaintyFactor * 100)}%
        </span>
      );
    } else {
      return (
        <span className="text-xs text-gray-600 font-medium flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          CF: {Math.round(photo.certaintyFactor * 100)}%
        </span>
      );
    }
  };

  const getScoreText = () => {
    const percentage = Math.round(photo.score * 100);
    return `${percentage}%`;
  };

  return (
    <Card className="photo-card">
      <CardContent className="p-0">
        <img src={photo.imageUrl} alt={photo.title} />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold truncate">{photo.title}</h3>
            {getQualityBadge()}
          </div>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm">Score: {getScoreText()}</span>
              {getCertaintyBadge()}
            </div>
            <Link 
              to={`/photos/${photo.id}`} 
              className="flex items-center text-sm text-primary hover:underline"
            >
              <BarChart className="h-3 w-3 mr-1" />
              Detail
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
