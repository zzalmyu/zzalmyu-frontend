import { useSuspenseQuery } from "@tanstack/react-query";
import { getTopTagsFromLiked } from "@/apis/tag";

const useGetTopTagsFromLiked = () => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["topTagsFromLiked"],
    queryFn: getTopTagsFromLiked,
  });

  return {
    topTags: data,
    ...rest,
  };
};
export default useGetTopTagsFromLiked;
