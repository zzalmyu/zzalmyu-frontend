import { useSuspenseQuery } from "@tanstack/react-query";
import tagQueries from "./queryKeyFactories";

const useGetTopTagsFromLiked = () => {
  const { data, ...rest } = useSuspenseQuery(tagQueries.topTagsFromLiked());

  return {
    topTags: data,
    ...rest,
  };
};
export default useGetTopTagsFromLiked;
