import { useQuery } from "@tanstack/react-query";
import tagQueries from "./queryKeyFactories";

const useGetPopularTags = () => {
  const { data, ...rest } = useQuery(tagQueries.popularTags());

  return {
    popularTags: data || [],
    ...rest,
  };
};

export default useGetPopularTags;
