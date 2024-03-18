import { ReactNode, createContext } from "react";
import { getUserInformation } from "@/apis/auth";
import { GetUserInformationResponse } from "@/types/user.dto";

export interface AuthContextType {
  isAuthenticated: () => Promise<GetUserInformationResponse>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = getUserInformation;

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
