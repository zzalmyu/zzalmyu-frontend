import { ReactNode, createContext } from "react";
import { getUserInfomation } from "@/apis/auth";
import { GetUserInfomationResponse } from "@/types/auth.dto";

interface AuthContext {
  isAuthenticated: () => Promise<GetUserInfomationResponse>;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = getUserInfomation;

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
