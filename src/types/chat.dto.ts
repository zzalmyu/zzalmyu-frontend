import { ChatMessage } from "./chat";

export interface ZzalMessageRequest {
  channelId: string;
  email: string;
  image: string;
}
export interface GreetMessageResponse {
  email: string;
  nickname: string;
  message: string;
}
export interface ZzalMessageResponse {
  email: string;
  nickname: string;
  image: string;
}

export type GetChatResponse = ChatMessage[];

export interface PostChatNicknameResponse {
  nickname: string;
  email: string;
}
