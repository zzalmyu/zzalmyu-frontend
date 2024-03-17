import { ReactNode, createContext } from "react";
import { getUserInformation } from "@/apis/auth";
import { GetUserInfomationResponse } from "@/types/auth.dto";

export interface AuthContextType {
  isAuthenticated: () => Promise<GetUserInfomationResponse>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = getUserInformation;

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
