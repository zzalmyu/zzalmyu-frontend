import { GetChatResponse } from "@/types/chat.dto";
import http from "./core";

export const getChat = (page: number) =>
  http.get<GetChatResponse>({ url: `/v1/chat?page=${page}` });
