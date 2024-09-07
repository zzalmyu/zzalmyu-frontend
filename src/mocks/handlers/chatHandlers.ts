import { http, HttpResponse } from "msw";
import { GetChatResponse } from "@/types/chat.dto";
import { chats } from "../data/chats";
import { zzals } from "../data/zzals";

const CHAT_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/chat`;

export const chatHandlers = [
  http.get(CHAT_BASE_URL, () => HttpResponse.json<GetChatResponse>(chats)),
  http.post(`${CHAT_BASE_URL}/nickname`, async ({ request }) => {
    const email = (await request.json()) as string;

    chats.push({
      nickname: "익명4",
      email,
      message: zzals[0].path,
      createdAt: "임시 날짜 1",
    });

    return HttpResponse.json({ status: 200 });
  }),
];
