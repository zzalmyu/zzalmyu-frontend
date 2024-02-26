import { useQuery } from "@tanstack/react-query";
import { getSearchTag } from "@/apis/tag";

export const useGetTags = (tag: string) => {
  return useQuery({
    queryKey: ["tag", tag] as const,
    queryFn: () => getSearchTag(tag),
    enabled: false,
  });
};
