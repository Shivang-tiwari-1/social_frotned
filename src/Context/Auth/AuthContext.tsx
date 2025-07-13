// Context/AuthContext.ts
import { createContext, useContext } from "react";

export type AuthContextType = {
  signup: (
    username: string,
    password: string
  ) => Promise<{ data: Record<string, unknown> } | undefined>;

  login: (
    username: string,
    password: string
  ) => Promise<{ data: Record<string, unknown> } | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
