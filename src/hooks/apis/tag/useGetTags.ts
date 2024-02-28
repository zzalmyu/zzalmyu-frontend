import { useQuery } from "@tanstack/react-query";
import { getSearchTag } from "@/apis/tag";

export const useGetTags = (tag: string) => {
  const MAX_TAG_RESPONSE_COUNT = 5;

  return useQuery({
    queryKey: ["tag", tag] as const,
    queryFn: () => getSearchTag(tag),
    select: (tags) => {
      const tagsResponse = tags.filter((_, index) => index < MAX_TAG_RESPONSE_COUNT);
      return tagsResponse;
    },
    enabled: !!tag,
  });
};
