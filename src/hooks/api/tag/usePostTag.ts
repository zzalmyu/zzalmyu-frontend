import { useMutation } from "@tanstack/react-query";
import { postUsedTag } from "@/apis/tag";

const usePostUsedTag = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: postUsedTag,
  });

  return {
    increaseTagUsage: mutate,
    ...rest,
  };
};

export default usePostUsedTag;
