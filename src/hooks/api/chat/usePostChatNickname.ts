import { useMutation } from "@tanstack/react-query";
import { postChatNickname } from "@/apis/chat";

const usePostChatNickname = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: (email: string) => postChatNickname(email),
  });

  return { createNickname: mutate, ...rest };
};

export default usePostChatNickname;
