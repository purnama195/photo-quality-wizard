
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// User types
type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Mock users for demo
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user" as UserRole,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(MOCK_USERS);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("photoQualityUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Load users from localStorage if any
    const savedUsers = localStorage.getItem("photoQualityUsers");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with mock users
      localStorage.setItem("photoQualityUsers", JSON.stringify(MOCK_USERS));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("photoQualityUser", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login berhasil",
        description: `Selamat datang, ${userWithoutPassword.name}`,
      });
    } else {
      toast({
        title: "Login gagal",
        description: "Email atau password salah",
        variant: "destructive",
      });
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const emailExists = users.some(u => u.email === email);
    
    if (emailExists) {
      toast({
        title: "Registrasi gagal",
        description: "Email sudah terdaftar",
        variant: "destructive",
      });
      setIsLoading(false);
      throw new Error("Email already exists");
    }
    
    // Create new user
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      password,
      role: "user" as UserRole,
    };
    
    // Add to users list
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("photoQualityUsers", JSON.stringify(updatedUsers));
    
    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("photoQualityUser", JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Registrasi berhasil",
      description: `Selamat datang, ${name}`,
    });
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("photoQualityUser");
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari sistem",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
