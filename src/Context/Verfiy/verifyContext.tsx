"use client";
import { createContext, useContext } from "react";

interface AuthState {
  user: unknown;
  accessToken: string;
  refreshToken: string;
}

interface VerifyContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const VerifyContext = createContext<VerifyContextType | undefined>(undefined);

export const useVerify = () => {
  const ctx = useContext(VerifyContext);
  if (!ctx) throw new Error("useAuth must be used within VerifyProvider");
  return ctx;
};

export default VerifyContext;
