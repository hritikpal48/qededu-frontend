"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserData } from "@/types/auth";
import { tokenStorage } from "@/utils/authTokenClient";
import { useRouter } from "next/navigation";
type AuthContextType = {
  isLogined: boolean;
  user: UserData | null;
  loading: boolean;
  login: (data: UserData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //     fetchUser(token);
    // } else {
    //     setLoading(false);
    // }
  }, []);
  // const fetchUser = async (token: string) => {
  //     try {
  //         const res = await fetch('/api/auth/me', {
  //             headers: {
  //                 Authorization: `Bearer ${token}`,
  //             },
  //         });
  //         if (!res.ok) throw new Error('Failed to fetch user');
  //         const userData = await res.json();
  //         setUser(userData);
  //     } catch (error) {
  //         console.error('Auth error:', error);
  //         localStorage.removeItem('token');
  //         setUser(null);
  //     } finally {
  //         setLoading(false);
  //     }
  // };
  const login = async (data: UserData) => {
    setUser(data);
    tokenStorage.set(data?.accessToken);
    setIsLogined(true);
    router.push("/user/dashboard");
  };

  const logout = () => {
    tokenStorage.remove();
    setUser(null);
    setIsLogined(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isLogined }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
