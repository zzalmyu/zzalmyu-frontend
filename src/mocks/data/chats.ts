import { ChatMessage } from "@/types/chat";
import { zzals } from "./zzals";

export const chats: ChatMessage[] = [
  {
    nickname: "익명1",
    email: "익명1@naver.com",
    message: zzals[0].path,
    createdAt: "임시 날짜 1",
  },
  {
    nickname: "익명2",
    email: "익명2@google.com",
    message: zzals[2].path,
    createdAt: "임시 날짜 2",
  },
  {
    nickname: "익명3",
    email: "익명3@naver.com",
    message: zzals[3].path,
    createdAt: "임시 날짜 3",
  },
];
