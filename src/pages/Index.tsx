
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, ArrowRight, Upload, BarChart, ShieldCheck } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="py-16 flex-1 flex items-center">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sistem Pakar Penentuan Kualitas Foto Studio
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Menggunakan metode Support Vector Machine (SVM) untuk menganalisis 
              dan menentukan kualitas foto secara otomatis.
            </p>
            
            {isAuthenticated ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/dashboard">
                    <BarChart className="h-5 w-5 mr-2" />
                    Lihat Dashboard
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/login">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Mulai Sekarang
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Sistem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Foto</h3>
              <p className="text-muted-foreground">Upload foto studio Anda dengan mudah dan cepat untuk dianalisis.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analisis Otomatis</h3>
              <p className="text-muted-foreground">Sistem secara otomatis menganalisis kualitas foto menggunakan metode SVM.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pengelolaan Admin</h3>
              <p className="text-muted-foreground">Panel admin untuk mengelola pengguna dan melihat semua hasil analisis.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
