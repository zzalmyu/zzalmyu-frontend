import { RefObject, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useAtomValue } from "jotai";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { GetChatResponse, GreetMessageRequest, ZzalMessageRequest } from "@/types/chat.dto";
import { $isChatOpen, $previewImage } from "@/store/chat";
import { CHANNEL_ID, PUBLISH_DESTINATION, SUBSCRIPTION_DESTINATION } from "@/constants/chat";

const useChat = (targetRef: RefObject<HTMLDivElement>) => {
  const queryClient = useQueryClient();
  const stompRef = useRef<CompatClient | null>(null);
  const imageSrc = useAtomValue($previewImage);
  const isChatOpen = useAtomValue($isChatOpen);

  // TODO: [2024.03.06] 채팅 에러 핸들링 로직 구현
  const handleConnectToChat = () => {
    if (stompRef.current) return;

    stompRef.current = Stomp.over(() => {
      return new SockJS(import.meta.env.VITE_CHAT_URL);
    });
    stompRef.current.beforeConnect = () => {
      // TODO: [2024.03.15] 사용자 정보 조회 API 호출하여 email 정보 수집
    };
    stompRef.current.onConnect = () => {
      stompRef.current?.subscribe(SUBSCRIPTION_DESTINATION, (frame) => {
        try {
          const parsedMessages = JSON.parse(frame.body);
          queryClient.setQueryData<InfiniteData<GetChatResponse>>(["chat"], (oldData) => {
            if (!oldData) {
              return undefined;
            }
            const oldMessages = oldData.pages.flatMap((page) => page);
            const updatedPages = oldData.pages.map((page, idx) => {
              if (idx === 0) {
                return [parsedMessages, ...page];
              }
              return page;
            });
            console.log(oldData, oldMessages, updatedPages);
            return { ...oldData, pages: updatedPages } as InfiniteData<GetChatResponse>;
          });
          // handleScrollPosition();
          targetRef.current?.scrollTo(0, targetRef.current.scrollHeight);
        } catch (error) {
          console.error(error);
          toast.error("채팅 연결 중 예상치 못한 오류가 발생했습니다!");
        } finally {
          console.log(JSON.parse(frame.body));
        }
      });

      // TODO: [2024.03.15] 로그인한 사용자만 greet 메세지 전송
      // handleSendMessage("greet");
    };
    stompRef.current.activate();
  };

  const handleSendMessage = (type: "zzal" | "greet") => {
    if (stompRef.current?.connected) {
      const messageContent: GreetMessageRequest | ZzalMessageRequest = {
        email: "cjy@test.com",
        channelId: CHANNEL_ID,
      };

      if (type === "zzal" && imageSrc) {
        (messageContent as ZzalMessageRequest).image = imageSrc;
      }

      stompRef.current.publish({
        destination: PUBLISH_DESTINATION[type],
        body: JSON.stringify(messageContent),
      });
    }
  };

  useEffect(() => {
    if (isChatOpen && !stompRef.current?.connected) {
      handleConnectToChat();
    }
  }, [isChatOpen]);

  return { handleSendMessage };
};

export default useChat;
