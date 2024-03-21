import { GetChatResponse, PostChatNicknameResponse } from "@/types/chat.dto";
import http from "./core";

export const getChat = (page: number) =>
  http.get<GetChatResponse>({ url: `/v1/chat?page=${page}` });

export const postChatNickname = (email: string) =>
  http.post<PostChatNicknameResponse>({
    url: "/v1/chat/nickname",
    data: {
      email,
    },
  });
