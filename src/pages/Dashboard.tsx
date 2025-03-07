
import { useState } from "react";
import PhotoUploader from "@/components/PhotoUploader";
import PhotoGrid from "@/components/PhotoGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Grid } from "lucide-react";

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    // Trigger a refresh of the photo grid
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="photos">
            <Grid className="h-4 w-4 mr-2" />
            Galeri Foto
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload Foto
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="photos">
          <PhotoGrid refreshTrigger={refreshTrigger} />
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Upload Foto Baru</h2>
              <p className="text-muted-foreground">
                Upload foto studio untuk dianalisis kualitasnya menggunakan algoritma SVM.
              </p>
            </div>
            <PhotoUploader onUploadSuccess={handleUploadSuccess} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
