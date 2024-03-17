import { ReactNode, createContext } from "react";
import { getUserInfomation } from "@/apis/auth";
import { GetUserInfomationResponse } from "@/types/auth.dto";

export interface AuthContexType {
  isAuthenticated: () => Promise<GetUserInfomationResponse>;
}

export const AuthContext = createContext<AuthContexType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = getUserInfomation;

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
