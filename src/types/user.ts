export interface UserInformation {
  userId: number;
  email: string;
  role: "USER" | "ADMIN" | "GUEST";
}
