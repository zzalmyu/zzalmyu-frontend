import { useSuspenseQuery } from "@tanstack/react-query";
import tagQueries from "./queryKeyFactories";

const useGetTopTagsFromHome = () => {
  const { data, ...rest } = useSuspenseQuery(tagQueries.topTagsFromHome());

  return {
    topTags: data,
    ...rest,
  };
};
export default useGetTopTagsFromHome;
