
import PhotoGrid from "@/components/PhotoGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPhotos } from "@/services/photoService";
import { Users, Image, BadgeCheck, X, BarChart } from "lucide-react";

const AdminPanel = () => {
  const allPhotos = getAllPhotos();
  const totalPhotos = allPhotos.length;
  const goodQualityPhotos = allPhotos.filter(p => p.quality === "good").length;
  const badQualityPhotos = allPhotos.filter(p => p.quality === "bad").length;
  
  // Calculate percentage of good photos
  const goodPercentage = totalPhotos > 0 
    ? Math.round((goodQualityPhotos / totalPhotos) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">2</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Foto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{totalPhotos}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Foto Berkualitas Baik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeCheck className="h-5 w-5 text-photo-good mr-2" />
              <span className="text-2xl font-bold">{goodQualityPhotos}</span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({goodPercentage}%)
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Foto Berkualitas Buruk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <X className="h-5 w-5 text-photo-bad mr-2" />
              <span className="text-2xl font-bold">{badQualityPhotos}</span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({100 - goodPercentage}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-card p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Semua Foto</h2>
        <PhotoGrid adminView={true} />
      </div>
    </div>
  );
};

export default AdminPanel;
