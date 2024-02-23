import { useQuery } from "@tanstack/react-query";
import { getPopularTags } from "@/apis/tag";

const useGetPopularTags = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularTags"],
    queryFn: getPopularTags,
  });

  return {
    popularTags: data || [],
    isLoading,
    error,
  };
};

export default useGetPopularTags;
