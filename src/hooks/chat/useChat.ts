import { RefObject, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useAtomValue } from "jotai";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { GetChatResponse, GreetMessageRequest, ZzalMessageRequest } from "@/types/chat.dto";
import { $isChatOpen, $previewImage } from "@/store/chat";
import { CHANNEL_ID, PUBLISH_DESTINATION, SUBSCRIPTION_DESTINATION } from "@/constants/chat";
import { $userInformation } from "@/store/user";

const useChat = (targetRef: RefObject<HTMLDivElement>) => {
  const queryClient = useQueryClient();
  const stompRef = useRef<CompatClient | null>(null);
  const imageSrc = useAtomValue($previewImage);
  const isChatOpen = useAtomValue($isChatOpen);
  const { role, email } = useAtomValue($userInformation);

  // TODO: [2024.03.06] 채팅 에러 핸들링 로직 구현
  const handleConnectToChat = () => {
    if (stompRef.current) return;

    stompRef.current = Stomp.over(() => {
      return new SockJS(import.meta.env.VITE_CHAT_URL);
    });

    stompRef.current.onConnect = () => {
      stompRef.current?.subscribe(SUBSCRIPTION_DESTINATION, (frame) => {
        try {
          const parsedMessages = JSON.parse(frame.body);
          queryClient.setQueryData<InfiniteData<GetChatResponse>>(["chat"], (oldData) => {
            if (!oldData) {
              return undefined;
            }
            const updatedPages = oldData.pages.map((page, idx) => {
              if (idx === 0) {
                return [parsedMessages, ...page];
              }
              return page;
            });
            return { ...oldData, pages: updatedPages } as InfiniteData<GetChatResponse>;
          });
          // handleScrollPosition();
        } catch (error) {
          console.error(error);
          toast.error("채팅 연결 중 예상치 못한 오류가 발생했습니다!");
        }
      });

      if (role === "GUEST") {
        return;
      }
      handleSendMessage("greet");
    };
    stompRef.current.activate();
  };

  const handleSendMessage = (type: "zzal" | "greet") => {
    if (role === "GUEST") {
      toast.info("메세지를 전송하려면 로그인을 진행해주세요!");
      return;
    }

    if (stompRef.current?.connected && email) {
      const messageContent: GreetMessageRequest | ZzalMessageRequest = {
        email,
        channelId: CHANNEL_ID,
      };

      if (type === "zzal" && imageSrc) {
        (messageContent as ZzalMessageRequest).image = imageSrc;
      }

      stompRef.current.publish({
        destination: PUBLISH_DESTINATION[type],
        body: JSON.stringify(messageContent),
      });

      targetRef.current?.scrollTo(0, targetRef.current.scrollHeight);
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
