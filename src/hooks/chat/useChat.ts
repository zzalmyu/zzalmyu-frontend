import { useEffect, useRef, useState } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useAtomValue } from "jotai";
import { $previewImage } from "@/store/chat";

const SUBSCRIPTION_DESTINATION = "/sub/public";
const PUBLISH_DESTINATION = {
  zzal: "/pub/image",
  greet: "/pub/hello",
} as const;
const CHANNEL_ID = "public";

interface GreetMessageRequest {
  channelId: string;
  email: string;
}
interface ZzalMessageRequest {
  channelId: string;
  email: string;
  image: string;
}
interface GreetMessageResponse {
  email: string;
  nickname: string;
  message: string;
}
interface ZzalMessageResponse {
  email: string;
  nickname: string;
  image: string;
}

const useChat = () => {
  const stompRef = useRef<CompatClient | null>(null);
  const mountedRef = useRef(false);
  const [messages, setMessages] = useState<(GreetMessageResponse | ZzalMessageResponse)[]>([]);
  const imageSrc = useAtomValue($previewImage);

  const handleConnect = () => {
    if (mountedRef.current) return;

    stompRef.current = Stomp.over(() => {
      return new SockJS(`${import.meta.env.VITE_CHAT_URL}`);
    });
    stompRef.current.onConnect = () => {
      console.log("WS connected");
      stompRef.current?.subscribe(SUBSCRIPTION_DESTINATION, (frame) => {
        try {
          const parsedMessages = JSON.parse(frame.body);

          console.log("parsedMessages: ", parsedMessages);
          setMessages((currentMessages) => [...currentMessages, parsedMessages]);
        } catch (error) {
          console.error("error on connect: ", error);
        }
      });

      handleSendMessage("greet");
    };
    stompRef.current.activate();
    mountedRef.current = true;
  };
  const handleSendMessage = (type: "zzal" | "greet") => {
    if (stompRef && stompRef.current?.connected) {
      const messageContent: GreetMessageRequest | ZzalMessageRequest = {
        email: "yjc@test.com",
        channelId: CHANNEL_ID,
      };
      if (type === "zzal") {
        if (imageSrc === "") return;
        (messageContent as ZzalMessageRequest).image = imageSrc;
      }

      stompRef.current.publish({
        destination: PUBLISH_DESTINATION[type],
        body: JSON.stringify(messageContent),
      });
    }
  };
  useEffect(() => {
    handleConnect();
    return () => {
      if (stompRef && stompRef.current?.connected) {
        stompRef.current.deactivate();
      }
    };
  }, []);

  return { handleSendMessage, messages };
};

export default useChat;
