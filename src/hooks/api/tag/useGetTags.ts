import { useQuery } from "@tanstack/react-query";
import tagQueries from "./queryKeyFactories";

export const useGetTags = (tag: string) => {
  const { data, ...rest } = useQuery(tagQueries.searchResult(tag));

  return {
    autoCompletedTags: data || [],
    ...rest,
  };
};
