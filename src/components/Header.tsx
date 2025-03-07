
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { LogOut, User, Camera, LayoutDashboard } from "lucide-react";

const Header = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Camera className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold">Photo Quality Wizard</h1>
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">
                {user.name}
                {isAdmin && <span className="ml-1 text-xs text-primary">(Admin)</span>}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin">
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    Admin Panel
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
              
              <Button variant="destructive" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
