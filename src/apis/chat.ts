import { GetChatResponse, PostChatNicknameResponse } from "@/types/chat.dto";
import http from "./core";

export const getChat = async (page: number) => {
  const data = await http.get<GetChatResponse>({ url: `/v1/chat?page=${page}` });
  return [...data].reverse();
};

export const postChatNickname = (email: string) =>
  http.post<PostChatNicknameResponse>({
    url: "/v1/chat/nickname",
    data: {
      email,
    },
  });
