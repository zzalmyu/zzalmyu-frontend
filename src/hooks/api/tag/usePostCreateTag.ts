import { useMutation } from "@tanstack/react-query";
import { postTagCreate } from "@/apis/tag";

export const usePostCreateTag = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: (tagName: string) => postTagCreate(tagName),
    onSuccess: () => console.log("태그 생성 성공"),
    onError: (error) => console.error(error),
  });

  return { createTag: mutate, ...rest };
};
