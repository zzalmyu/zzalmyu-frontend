import { useEffect, useRef, useState } from "react";
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
          console.error("STOMP 연결 중 에러 발생: ", error);
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
    console.log("hi");
    handleConnectToChat();
    return () => {
      if (stompRef && stompRef.current?.connected) {
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
