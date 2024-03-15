export interface ChatMessage {
  nickname: string;
  email: string;
  message: string;
  createdAt: string;
  type: "IMAGE" | "HELLO";
}
