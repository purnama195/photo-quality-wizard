
import { useAuth } from "@/context/AuthContext";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";

interface LayoutProps {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const Layout = ({ requireAuth = false, requireAdmin = false }: LayoutProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirements
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check admin requirements
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        <div className="container mx-auto">
          <p>© 2023 Photo Quality Wizard · Skripsi Project</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
