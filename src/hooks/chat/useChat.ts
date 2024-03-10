import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useAtomValue } from "jotai";
import {
  GreetMessageRequest,
  GreetMessageResponse,
  ZzalMessageRequest,
  ZzalMessageResponse,
} from "@/types/chat.dto";
import { $previewImage } from "@/store/chat";
import { CHANNEL_ID, PUBLISH_DESTINATION, SUBSCRIPTION_DESTINATION } from "@/constants/chat";

const useChat = (handleScrollPosition: () => void) => {
  const stompRef = useRef<CompatClient | null>(null);
  const [messages, setMessages] = useState<(GreetMessageResponse | ZzalMessageResponse)[]>([]);
  const imageSrc = useAtomValue($previewImage);

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
          setMessages((currentMessages) => [...currentMessages, parsedMessages]);
        } catch (error) {
          toast.error("채팅 연결 중 예상치 못한 오류가 발생했습니다!");
        }
      });

      handleSendMessage("greet");
    };
    stompRef.current.activate();
  };

  const handleSendMessage = (type: "zzal" | "greet") => {
    if (stompRef.current?.connected) {
      const messageContent: GreetMessageRequest | ZzalMessageRequest = {
        email: "yjc@test.com",
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
    handleConnectToChat();
    return () => {
      if (stompRef.current?.connected) {
        stompRef.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    handleScrollPosition();
  }, [messages]);

  return { handleSendMessage, messages };
};

export default useChat;
