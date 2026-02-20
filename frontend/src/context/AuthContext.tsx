import { createContext, useCallback, useState, useEffect, ReactNode, useContext } from "react";
import { api } from "@/lib/api"; // Certifique-se que o caminho está correto
import { User } from "../types/user"; // Ou onde você definiu a interface User (veja nota abaixo*)

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User | undefined;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    const token = localStorage.getItem("@Modas:token");
    const user = localStorage.getItem("@Modas:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user: JSON.parse(user) });
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@Modas:token", token);
    localStorage.setItem("@Modas:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signUp = useCallback(async ({ name, email, password, isAdmin = false }: SignUpCredentials) => {
    await api.post("/users", {
      name,
      email,
      password,
      isAdmin
    });
    
    await signIn({ email, password });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Modas:token");
    localStorage.removeItem("@Modas:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, signUp, isAuthenticated: !!data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}