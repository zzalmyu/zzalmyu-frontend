export interface GetUserInfomationResponse {
  userId: number;
  email: string;
  role: "USER" | "ADMIN";
}
