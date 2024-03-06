export interface GreetMessageRequest {
  channelId: string;
  email: string;
}
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
