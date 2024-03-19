import { useMutation } from "@tanstack/react-query";
import { postTag } from "@/apis/tag";

export const usePostTag = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: (tagName: string) => postTag(tagName),
  });

  return { createTag: mutate, ...rest };
};
